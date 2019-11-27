module.exports = {
	name: 'giveheart',
	description: 'giveheart.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/giveheart.png"
                ],
            },);
    },
};