const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'whalehome',
	description: 'Set mr whale to send messages in this channel',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        whaleData["homeChannel"] = message.channel.id;
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`From now on, I will live in ${message.channel}`);
    },
};