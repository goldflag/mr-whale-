module.exports = {
    name: 'fly',
	description: 'choo choo',
	execute(message, args) {
        let vehicle = '';
        if (args.length == 0) {
            vehicle = '✈';
        }
        else if (args[0].toLowerCase() == 'plane') {
            vehicle = '✈';
        }
        else if (args[0].toLowerCase() == 'rocket') {
            vehicle = '🚀';
        }
        let howManyTimes = 40;
        let howManyTimesCounter = 0;
        let str = `☁️${vehicle}`
        message.channel.send(str).then(async msg => {
            this.fly(msg, str, howManyTimes, howManyTimesCounter)
        });
    },

    fly(msg, str, howManyTimes, howManyTimesCounter) {
        if (howManyTimesCounter < howManyTimes){
            howManyTimesCounter = howManyTimesCounter + 1;
            str = '☁️' + str;
            msg.edit(str)
            setTimeout(() => { this.fly(msg, str, howManyTimes, howManyTimesCounter); }, 1000 );
        }
    }
};