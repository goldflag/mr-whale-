const fs = require('fs');
const Discord = require('discord.js');
const Whalestatus = require('./whalestatus.js');

module.exports = {
	name: 'whalehunger',
	description: 'See just the hunger bar of mr whale',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let hungerBar = Whalestatus.hungerCalculator();
		message.channel.send(`**${whaleData["hunger"]}/15** ` + "\`" + hungerBar + "\`");
    },
};