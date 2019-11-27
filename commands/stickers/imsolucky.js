module.exports = {
	name: 'imsolucky',
	description: 'imsolucky.png sticker found in /storage',
	execute(message, args) {
            message.channel.send('', {
                files: [
                    "./assets/imsolucky.png"
                ],
            },);
    },
};