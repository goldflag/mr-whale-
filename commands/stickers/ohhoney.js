module.exports = {
	name: 'ohhoney',
	description: 'ohhoney.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/ohhoney.png"
                ],
            },);
    },
};