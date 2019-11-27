const { prefix } = require('../config.json');

module.exports = {
	name: 'math',
	description: 'Does math using the eval() function',
	execute(message, args) {
        console.log('test');
        let str = args.toString();
        str = str.replace(/\s/g, '');
        str = str.replace(/[^*+-/1234567890()]/g, ''); 
        if (isNaN(str[str.length-1])) {
            let myArray = [
                "u fucking failed",
                "syntax error idiot",
                "wtf is that",
                "i dont know how to solve that",
                "no",
                "don't understand",
                "invalid",
                "syntax error",
                "try again moron",
                "learn to type imbecile",
              ];
            let randomItem = myArray[Math.floor(Math.random()*myArray.length)];
            message.channel.send(randomItem);
            return;
        }
        let temp = eval(str);
        message.channel.send(temp);
        return;	
    },
};