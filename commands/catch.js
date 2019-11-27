const fs = require('fs');
let { fish, squid, krill } = require('../index.js')

module.exports = {
	name: 'catch',
	description: 'Try to catch a fish, squid, or krill',
	execute(message, args) {

        if (args.length == 0) {
            return message.channel.send(`What do you want to catch? 🐟, 🦑, or 🦐?`);
        }
        let data = fs.readFileSync(`./storage/${message.member.id}.json`);
        let foodCount = JSON.parse(data);

        let counter = 0;
        if (args[0].toLowerCase()  == "fish" || args[0] == "🐟") {
            if (fish.length <= 0) {
                let noMessage = [
                    `there aren't any fish to catch`, 
                    `there are no fish around here`, 
                    `I don't see anyt fish around here`, 
                    `you can't catch a imaginary fish!`, 
                    ]
                return message.channel.send(`${noMessage[Math.floor(Math.random()*noMessage.length)]}`);
            }
            this.func(fish, "fish", counter, foodCount, message);
        }
        else if (args[0].toLowerCase()  == "squid" || args[0] == "🦑") {
            if (squid.length <= 0) {
                let noMessage = [
                    `there aren't any squid to catch`, 
                    `there are no squid around here`, 
                    `I don't see anyt squid around here`, 
                    `you can't catch a imaginary squid!`, 
                    ]
                return message.channel.send(`${noMessage[Math.floor(Math.random()*noMessage.length)]}`);
            }
            this.func(squid, "squid", counter, foodCount, message);
        }
        else if (args[0].toLowerCase()  == "krill" || args[0].toLowerCase()  == "shrimp" || args[0] == "🦐") {
            if (krill.length <= 0) {
                let noMessage = [
                    `there aren't any krill to catch`, 
                    `there are no krill around here`, 
                    `I don't see anyt krill around here`, 
                    `you can't catch a imaginary krill!`, 
                    ]
                return message.channel.send(`${noMessage[Math.floor(Math.random()*noMessage.length)]}`);
            }
            this.func(krill, "krill", counter, foodCount, message);
        }
    },
    
    func(array, food, counter, foodCount, message) {
        for (let i = 0; i < array.length; i++) {
            rand = Math.random();
            if (rand > 0.5) {
                array.splice(i,1)
                counter = counter + 1;
            }
        }
        for (let i = 0; i < array.length; i++) {
            array[i]["name"] = i;
        }
        if (counter == 0) {
            let failMessage = [
            `the ${food} evaded you`, 
            `You weren't able to catch the ${food}`, 
            `Your attempt to catch the ${food} failed`, 
            `You didn't catch the ${food}`, 
            `the ${food} dodged you`, 
            `you failed to catch the ${food}`, 
            `you failed. Try again`, 
            `The ${food} won't get caught without a struggle!`, 
            `Your efforts have failed.`
            ]
            message.channel.send(`sorry, ${message.member}, ${failMessage[Math.floor(Math.random()*failMessage.length)]}`);
        }
        else {
            let successMessage = [
                `has caught`, 
                `has reeled in`, 
                `has caught`, 
                `has successfully caught`, 
                ]
            message.channel.send(`${message.member} ${successMessage[Math.floor(Math.random()*successMessage.length)]} ${counter} ${food}!`);
            foodCount[food] = foodCount[food] + counter;
            foodCount = JSON.stringify(foodCount);
            fs.writeFileSync(`./storage/${message.member.id}.json`, foodCount);
        }
    }
};