const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'adminhelp',
    cooldown: 10,
	description: 'See all the admin commands and how to interact with Mr. Whale',
	execute(message, args) {
        const helpEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        //.setURL('https://discord.js.org/')
        //.setAuthor('Bill Yang', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('__List of Mr Whale Admin Commands__')
        .attachFiles(['./assets/mrwhale.png'])
        .setThumbnail('attachment://mrwhale.png')        
        //.addField('Regular field title', 'Some value here')
        //.addBlankField()
        .addField(`${prefix}whalehome`, `Sets mr whale\`s home in the channel`)
        .addField(`${prefix}whaleocean`, `Sets mr whale\`s ocean in the channel`)
        .addField(`${prefix}whaledebug`, `Shows all of mr whale\`s data`)
        .addField(`${prefix}spawnrate [type] [number]`, `Sets spawnrate of fish, squid, or krill. Only values 1-100 accepted`)
        .addField(`${prefix}despawnrate [type] [number]`, `Sets despawn rate of fish, squid, or krill. Only values 1-100 accepted`)
        .addField(`${prefix}sethungerlevel [number]`, `Sets the hunger level of mr whale, 1 to 15`)
        .addField(`${prefix}sethunger [number]`, `Sets how quickly mr whale gets hungry, from 1 to 100`)
        .addField(`${prefix}whalehunger`, `See mr whale\`s hunger bar`)
        .addField(`${prefix}whalestatus`, `See mr whale\`s status`)
        .addField(`${prefix}whalehome`, `Sets mr whale\`s home in the channel`)
        .addField(`${prefix}setprefix [prefix]`, `Sets mr whale\`s prefix to a different character`)

        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        message.channel.send(helpEmbed);
    },
};