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
        .setDescription(`User data for ${message.member.displayName}`)
        .setThumbnail(message.author.avatarURL)        
        .addField('🐟', `**${playerData["fish"]}**` , true)
        .addField('🦑', `**${playerData["squid"]}**`, true)
        .addField('🦐', `**${playerData["krill"]}**`, true)
        
        message.channel.send(dataEmbed);
	},
};