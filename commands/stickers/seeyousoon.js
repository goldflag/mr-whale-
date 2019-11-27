module.exports = {
	name: 'seeyousoon',
	description: 'seeyousoon.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/seeyousoon.png"
                ],
            },);
    },
};