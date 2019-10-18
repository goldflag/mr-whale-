const fs = require('fs');
const Whalestatus = require('./whalestatus.js');

module.exports = {
    name: 'feed',
    cooldown: 3,
	description: 'Feed mr whale to restore his hunger',
	execute(message, args) {

        myArray = [
            "smileywhale",
            "Smileywhale",
            "thanks",
            "yum",
            "yummy",
            "smileydog",
            "smileycat",
            ":smiley_dog:",
            ":smiley_cat:",
            "I love you!",
            "tasty!",
            `thanks for feeding me ${args[0]}`
          ]

        if (args.length == 0) {
            return 	message.channel.send("I can't eat something that doesn't exist!");
        }
        for (let i = 0; i < args.length; i++) {
            if (args[i] != '🐟' && args[i] != '🦑' && args[i] != '🦐') {
                return message.channel.send("Hey I can't eat that");
            }
        }
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let data2 = fs.readFileSync(`./storage/${message.member.id}.json`);
        let userData = JSON.parse(data2);
        if (whaleData[`hunger`] >= 15) { 
            message.channel.send(`I can't eat it. I'm full!`);
            return;
        }
        if (args[0] == '🐟') {
            if (userData['fish'] <= 0) {
                message.channel.send(`You don't have any fish to feed mr whale! Use \`~catch fish\` to catch a fish when it appears`);
                return;
            }
            else {
                whaleData[`hunger`] = whaleData[`hunger`] + 2;
                userData['fish'] = userData['fish'] - 1;
            }
        }
        else if (args[0] == '🦑') {
            if (userData['squid'] <= 0) {
                message.channel.send(`You don't have any squid to feed mr whale! Use \`~catch squid\` to catch a squid when it appears`);
                return;
            }
            else {
                whaleData[`hunger`] = whaleData[`hunger`] + 3;
                userData['squid'] = userData['squid'] - 1;
            }        
        }
        else if (args[0] == '🦐') {
            if (userData['krill'] <= 0) {
                message.channel.send(`You don't have any shrimp to feed mr whale! Use \`~catch shrimp\` to catch a shrimp when it appears`);
                return;
            }
            else {
                whaleData[`hunger`] = whaleData[`hunger`] + 1;
                userData['krill'] = userData['krill'] - 1;
            }        
        }
        if (whaleData[`hunger`] > 15) { 
            whaleData[`hunger`] = 15; 
        }
        let hungerLevel = whaleData[`hunger`];
        whaleData = JSON.stringify(whaleData);
        fs.writeFileSync(`./mrwhale.json`, whaleData);
        userData = JSON.stringify(userData);
        fs.writeFileSync(`./storage/${message.member.id}.json`, userData);
        message.channel.send(`${message.member}, thanks for feeding me a ${args[0]}! My hunger is now at ${hungerLevel}`);
        message.channel.send(myArray[Math.floor(Math.random()*myArray.length)]);
        let hungerBar = Whalestatus.hungerCalculator();
		message.channel.send(`**${hungerLevel}/15** ` + "\`" + hungerBar + "\`");
    },

};