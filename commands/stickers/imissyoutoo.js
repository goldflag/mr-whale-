module.exports = {
	name: 'imissyoutoo',
	description: 'imissyoutoo.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/imissyoutoo.png"
                ],
            },);
    },
};