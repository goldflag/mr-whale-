const fs = require('fs');

module.exports = {
	name: 'sethunger',
	description: 'Change how quickly mr whale gets hungry',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let hungerRate = args[0];
        if (isNaN(hungerRate)) {
            message.channel.send(`${message.member}, ${hungerRate} isn't an integer`);
            return;
        }
        if (hungerRate < 5) {
            hungerRate = 5;
        }
        else if (hungerRate > 75) {
            hungerRate = 75;
        }
        whaleData[`hungerRate`] = parseInt(hungerRate);
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`${message.member}, my hunger rate has been set to ${hungerRate}`);
	},
};