const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    cooldown: 15,
	description: 'See all the regular commands and how to interact with Mr. Whale',
	execute(message, args) {
        const helpEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        //.setURL('https://discord.js.org/')
        //.setAuthor('Bill Yang', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('__List of Mr Whale Commands__')
        .attachFiles(['./assets/mrwhale.png'])
        .setThumbnail('attachment://mrwhale.png')        
        //.addField('Regular field title', 'Some value here')
        //.addBlankField()
        .addField(`${prefix}trivia help`, `All trivia game commands`)
        .addField(`${prefix}feed [🐟]`, `Feed mr whale to restore Hunger. Accepts 🐟, 🦑, and 🦐`)
        .addField(`${prefix}math [problem]`, `Ask mr whale to solve a simple math operation`)
        .addField(`${prefix}nick`, `Set the nickname you want to be called`)
        .addField(`${prefix}saynick [nickname]`, `See your nickname`)
        .addField(`${prefix}ping`, `Pong!`)
        .addField(`${prefix}whalehunger`, `See mr whale\`s hunger bar`)
        .addField(`${prefix}whalestatus`, `See mr whale\`s status`)
        .addField(`${prefix}inv`, `Shows user\`s fish inventory`)
        .addField(`${prefix}catch[type]`, `Attempts to catch fish, squid, or krill`)
        .addField(`${prefix}stickers`, `All SC sticker commands`)
        .addField(`${prefix}adminhelp`, `admin commands`)

        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        message.channel.send(helpEmbed);
    },
};