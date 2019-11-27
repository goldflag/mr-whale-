module.exports = {
	name: 'imcoming',
	description: 'imcoming.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/imcoming.png"
                ],
            },);
    },
};