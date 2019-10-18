/*
* mr whale bot v1.0
* Author: Zeyu Yang
* Date: 10/15/2019
* Created with Discord.js
*/

const Discord = require('discord.js');
const fs = require('fs');
//const Cannedresponses = require('./cannedresponses.js');
const Functions = require('./functions.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

let fish = [];
let squid = [];
let krill = [];
module.exports = { fish, squid, krill };

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    /*
    const mems = client.guilds.get("629315551478415360"); 
    mems.members.forEach(member => {
         //money.set(member.user.username, 1);
         console.log(member.user.username);
    }); 
    */
    client.users.forEach(user => {
        Functions.checkPlayer(user);
    }); 
    
    //mr whale hunger is updated every 100 seconds
    setInterval(Functions.hunger, 100000);

    //Fish spawns are calculated every 60 seconds
    setInterval(function() { 
       Functions.fishSpawn(client, fish, squid, krill);                      
    }, 6000);

    //Fish despawns are calculated every 60 seconds
    setInterval(function() { 
        if (fish.length > 0 || squid.length > 0 || krill.length > 0) {
            Functions.fishDespawn(client, fish, squid, krill);             
        }
        
    }, 1000);

});

client.on('error', console.error);

//keyv.on('error', err => console.error('Keyv connection error:', err));

client.on('message', (message) => {
    console.log(`${message.member.displayName}: ${message.content}`);
    if (message.author.bot) { return; }
    if (message.content.toLowerCase() === `hi`) {
        if (Math.random() > 0.5) {
            return message.channel.send(Functions.hi(message));
        }
        else {
            return;
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on('guildMemberAdd', member => {
    Functions.checkPlayer(member);
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });
  
client.login(token);