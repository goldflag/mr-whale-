module.exports = {
	name: 'catdogheart2',
	description: 'catdogheart2.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/catdogheart2.png"
                ],
            },);
    },
};