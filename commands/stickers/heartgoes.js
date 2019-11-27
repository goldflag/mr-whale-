module.exports = {
	name: 'heartgoes',
	description: 'heartgoes.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/heartgoes.png"
                ],
            },);
    },
};