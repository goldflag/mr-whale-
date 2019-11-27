module.exports = {
	name: 'ineedyou',
	description: 'ineedyou.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/ineedyou.png"
                ],
            },);
    },
};