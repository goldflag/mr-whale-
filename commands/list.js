const fs = require('fs');
const Discord = require('discord.js');
let { fish, squid, krill } = require('../index.js')

module.exports = {
    name: 'list',
    cooldown: 3,
	description: 'list all the animals in the water',
	execute(message, args) {
        let data = fs.readFileSync(`./storage/${message.member.id}.json`);
        let playerData = JSON.parse(data);

        const dataEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(`Current fish, squid, and krill in our area`)
        .addField('🐟', `**${fish}**`)
        .addField('🦑', `**${squid}**`)
        .addField('🦐', `**${krill}**`)
        
        message.channel.send(dataEmbed);
        message.channel.send(fish);
        message.channel.send(squid);
        message.channel.send(krill);
	},
};