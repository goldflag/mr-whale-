module.exports = {
	name: 'mine',
	description: 'mine.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/mine.png"
                ],
            },);
    },
};