const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'See all the commands and how to interact with Mr. Whale',
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
        .addField('~feed [🐟]', 'Feed mr whale to restore Hunger. Accepts 🐟, 🦑, and 🦐')
        .addField('~math [problem]', 'Ask mr whale to solve a simple math operation')
        .addField('~nick', 'Set the nickname you want to be called')
        .addField('~saynick [nickname]', 'See your nickname')
        .addField('~ping', 'Pong!')
        .addField('~whalehunger', 'See mr whale\'s hunger bar')
        .addField('~whalestatus', 'See mr whale\'s status')
        .addField('~whalehome', 'Sets mr whale\'s home in the channel')
        .addField('Inline field title', 'Some value here')
        .addField('Inline field title', 'Some value here')

        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        message.channel.send(helpEmbed);
    },
};