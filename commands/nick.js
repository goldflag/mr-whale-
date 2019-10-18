const fs = require('fs');

module.exports = {
	name: 'nick',
	description: 'Change what the bot calls you!',
	execute(message, args) {
        let data = fs.readFileSync(`./storage/${message.member.id}.json`);
        let nicks = JSON.parse(data);
        nicks[`nick`] = args[0];
        nicks = JSON.stringify(nicks);
        fs.writeFileSync(`./storage/${message.member.id}.json`, nicks);
		message.channel.send(`${message.member} From now on, I will call you ${args[0]}`);
	},
};