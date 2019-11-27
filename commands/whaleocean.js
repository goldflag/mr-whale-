const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'whaleocean',
	description: 'Set the ocean',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        whaleData["ocean"] = message.channel.id;
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`From now on, the ocean will be ${message.channel}`);
    },
};