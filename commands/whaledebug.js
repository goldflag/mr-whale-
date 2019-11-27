const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'whaledebug',
	description: 'See every mr whale value',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        const statusEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Whale Debug')
            .addField('Hunger', `**${whaleData["hunger"]}**`, true)
            .addField('Hunger Rate', `**${whaleData["hungerRate"]}**` , true)
            .addField('Catch Rate', `**${whaleData["huntChance"]}**` , true)
            .addField('Mood', `**Smileywhale**`, true)
            .addField('homeChannel', `**${whaleData["homeChannel"]}**`, true)
            .addField('ocean', `**${whaleData["ocean"]}**`, true)
            .addBlankField()
            .addField('fishSpawn', `**${whaleData["fishSpawn"]}**`, true)
            .addField('squidSpawn', `**${whaleData["squidSpawn"]}**`, true)
            .addField('krillSpawn', `**${whaleData["krillSpawn"]}**`, true)
            .addField('fishDespawn', `**${whaleData["fishDespawn"]}**`, true)
            .addField('fishDespawn', `**${whaleData["squidDespawn"]}**`, true)
            .addField('fishDespawn', `**${whaleData["krillDespawn"]}**`, true)
            message.channel.send(statusEmbed);
	},
};