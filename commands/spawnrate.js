const fs = require('fs');

module.exports = {
	name: 'spawnrate',
	description: 'Change how quickly fish, squid, and krill spawn from 1 to 100',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let animal = args[0];
        let num = args[1];
        if (isNaN(num)) {
            return message.channel.send(`${message.member}, please set spawn rate at as a number`);
        } 
        if (num < 1) {
            num = 1;
        }
        else if (num > 100) {
            num = 100;
        }
        if (animal.toLowerCase() === "fish") {
            whaleData[`fishSpawn`] = parseInt(num);
        }
        if (animal.toLowerCase() === "squid") {
            whaleData[`squidSpawn`] = parseInt(num);
        }
        if (animal.toLowerCase() === "krill") {
            whaleData[`krillSpawn`] = parseInt(num);
        }
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`${message.member}, ${animal} spawn rate has been adjusted to ${num}`);
	},
};