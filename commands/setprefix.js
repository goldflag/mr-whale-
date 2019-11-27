const fs = require('fs');

module.exports = {
	name: 'setprefix',
	description: 'Change the prefix',
	execute(message, args) {
        let data = fs.readFileSync(`./config.json`);
        let prefix = JSON.parse(data);
        let newprefix = args[0];
        if (newprefix.toString().length != 1) {
            message.channel.send(`${message.member}, invalid prefix. Prefix can only be one character`);
            return;
        }
        prefix[`prefix`] = newprefix;
        prefix = JSON.stringify(prefix);
        fs.writeFileSync(`./config.json`, prefix);
		message.channel.send(`${message.member}, the prefix has been set to ${newprefix}`);
	},
};