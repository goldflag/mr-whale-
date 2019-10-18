const fs = require('fs');

module.exports = {
	name: 'sethungerlevel',
	description: 'Change mr whale\'s hunger level',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let hunger = args[0];
        if (isNaN(hunger)) {
            message.channel.send(`${message.member}, ${hunger} isn't an integer`);
            return;
        }
        if (hunger < 0) {
            hunger = 0;
        }
        else if (hunger > 15) {
            hunger = 15;
        }
        whaleData[`hunger`] = parseInt(hunger);
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
		message.channel.send(`${message.member}, my current hunger level has been set to ${hunger}`);
	},
};