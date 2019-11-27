module.exports = {
	name: 'imissyou',
	description: 'imissyou.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/imissyou.png"
                ],
            },);
    },
};