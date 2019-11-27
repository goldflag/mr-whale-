module.exports = {
	name: 'anythingforyou',
	description: 'anythingforyou.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/anythingforyou.png"
                ],
            },);
    },
};