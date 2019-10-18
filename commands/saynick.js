const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
	name: 'saynick',
	description: 'Tells the user their nickname',
	execute(message, args) {
        const data = fs.readFileSync(`./storage/${message.member.id}.json`);
        const nicks = JSON.parse(data);
        if (nicks["nick"] === message.member.username) {
            message.channel.send(`${message.member} you don't have a nickname. Use \`${prefix}nick [your nickname]\` to set a nickname.`);
            return;
        }
		message.channel.send(`${message.member} you nickname is ${nicks["nick"]}`);
	},
};