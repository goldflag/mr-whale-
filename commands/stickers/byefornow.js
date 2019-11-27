module.exports = {
	name: 'byefornow',
	description: 'byefornow.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/byefornow.png"
                ],
            },);
    },
};