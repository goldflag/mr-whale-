module.exports = {
	name: 'hi',
	description: 'hi.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/hi.png"
                ],
            },);
    },
};