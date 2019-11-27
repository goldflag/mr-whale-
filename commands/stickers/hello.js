module.exports = {
	name: 'hello',
	description: 'hello.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/hello.png"
                ],
            },);
    },
};