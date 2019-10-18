const fs = require('fs');
let { fish, squid, krill } = require('../index.js')

module.exports = {
	name: 'catch',
	description: 'Try to catch a fish, squid, or krill',
	execute(message, args) {
        let data = fs.readFileSync(`./storage/${message.member.id}.json`);
        let foodCount = JSON.parse(data);

        let counter = 0;
        if (args[0].toLowerCase()  == "fish" || args[0] == "🐟") {
            this.func(fish, "fish", counter, foodCount, message);
        }
        else if (args[0].toLowerCase()  == "squid" || args[0] == "🦑") {
            this.func(squid, "squid", counter, foodCount, message);
        }
        else if (args[0].toLowerCase()  == "krill" || args[0].toLowerCase()  == "shrimp" || args[0] == "🦐") {
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
            message.channel.send(`sorry, ${message.member} didn't catch any ${food}!`);
        }
        else {
            message.channel.send(`${message.member} has caught ${counter} ${food}!`);
            foodCount[food] = foodCount[food] + counter;
            foodCount = JSON.stringify(foodCount);
            fs.writeFileSync(`./storage/${message.member.id}.json`, foodCount);
        }
    }
};