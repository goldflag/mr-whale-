const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'inv',
    cooldown: 3,
	description: 'See personal inventory',
	execute(message, args) {
        let data = fs.readFileSync(`./storage/${message.member.id}.json`);
        let playerData = JSON.parse(data);

        const dataEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(`${message.member.displayName}'s Data`)
        //.setURL('https://discord.js.org/')
        //.setAuthor('Bill Yang', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription(`User data for ${message.member.displayName}`)
        //.attachFiles(['./assets/mrwhale.png'])
        .setThumbnail(message.author.avatarURL)        
        //.addField('Regular field title', 'Some value here')
        //.addBlankField()
        .addField('🐟', `**${playerData["fish"]}**` , true)
        .addField('🦑', `**${playerData["squid"]}**`, true)
        .addField('🦐', `**${playerData["krill"]}**`, true)
        //.addField('Inline field title', 'Some value here', true)

        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        message.channel.send(dataEmbed);
	},
};