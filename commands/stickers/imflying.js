module.exports = {
	name: 'imflying',
	description: 'imflying.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/imflying.png"
                ],
            },);
    },
};