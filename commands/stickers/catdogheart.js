module.exports = {
	name: 'catdogheart',
	description: 'catdogheart.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/catdogheart.png"
                ],
            },);
    },
};