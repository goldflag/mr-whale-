module.exports = {
	name: 'iminlove',
	description: 'iminlove.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/iminlove.png"
                ],
            },);
    },
};