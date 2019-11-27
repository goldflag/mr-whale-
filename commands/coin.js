module.exports = {
    name: 'coin',
	description: 'flip a coin for heads or tails',
	execute(message, args) {
        message.channel.send('Tossing coin...');
        setTimeout(() => { this.roll(message); }, 1500);
    },

    roll(message){
        let rand = Math.random();
        if (rand > 0.5) {
            message.channel.send('You got heads',{
                files: [
                    "./assets/heads.png"
                ],
            },);
        }
        else {
            message.channel.send('You got tails',{
                files: [
                    "./assets/tails.png"
                ],
            },);
        }
    }
};