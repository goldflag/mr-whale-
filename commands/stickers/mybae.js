module.exports = {
	name: 'mybae',
	description: 'mybae.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/mybae.png"
                ],
            },);
    },
};