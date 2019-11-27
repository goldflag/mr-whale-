const fs = require('fs');

module.exports = {
	name: 'setselfcatchrate',
	description: 'Change how often mr whale catches food himself',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let catchRate = args[0];
        if (isNaN(catchRate)) {
            message.channel.send(`${message.member}, ${catchRate} isn't an integer`);
            return;
        }
        if (catchRate < 1) {
            catchRate = 1;
        }
        else if (catchRate > 100) {
            catchRate = 100;
        }
        whaleData[`huntChance`] = parseInt(catchRate);
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`${message.member}, my catch rate has been set to ${catchRate}`);
	},
};