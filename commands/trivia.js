const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'trivia',
    description: 'Trivia Game',
	async execute(message, args) {

        if (args[0].toLowerCase() === "list") {
            this.list(message);
        }
        if (args[0].toLowerCase() === "help") {
            this.help(message);
        }

        let gameName;
        let gameType;
        let gameData;
        let obj_keys;
        let howManyTimes = 10;
        let timeBetween = 15000;
        let players = {};
        let playerArray = [];

        if (args.length >= 3 && !isNaN(args[2])) {
            howManyTimes = args[2];
            if (howManyTimes < 3) {
                howManyTimes = 3;
            }
            else if (howManyTimes > 20) {
                howManyTimes = 20;
            }
        }
        if (args.length >= 4 && !isNaN(args[3])) {
            let timeBetween = args[3]*1000;
            if (timeBetween < 5000) {
                timeBetween = 5000;
            }
            else if (timeBetween > 60000) {
                timeBetween = 60000;
            }
        }
        if (args[0].toLowerCase() === "start") {
            if (args[1].toLowerCase() === "geography") {
                gameName = "Geography";
            }
            else if (args[1].toLowerCase() === "random") {
                gameName = "Random";
            }
            else if (args[1].toLowerCase() === "history") {
                gameName = "History";
            }
            else if (args[1].toLowerCase() === "nba") {
                gameName = "NBA";
            }
            else {
                message.channel.send("Invalid game choice");
            }
            //const a = message.guild.emojis.find(emoji => emoji.name === "catthink");
            gameType = fs.readFileSync(`./games/triviadata/${gameName.toLowerCase()}.json`);
            gameData = JSON.parse(gameType);
            message.channel.send(`${message.member} has started a game of ${gameName} trivia!`);
            obj_keys = Object.keys(gameData['trivia']);
            let howManyTimesCounter = 0
            this.quiz(message, gameName, timeBetween, howManyTimesCounter, howManyTimes, gameData, obj_keys, players, playerArray);
        }
    },

    list(message) {
        const listEmbed = new Discord.RichEmbed()
            .setColor('#33cc33')
            .setTitle(`Trivia Topics`)
            .addField(`**To start game: \`${prefix}trivia start [topic]\`** \nExample: \`${prefix}trivia start geography\``, 
            `1. Geography`) 
        message.channel.send(listEmbed);
    },

    help(message) {
        const listEmbed = new Discord.RichEmbed()
            .setColor('#33cc33')
            .setTitle(`Trivia Help`)
            .addField(`\`${prefix}trivia start {topic} [number of questions] [time per question]\``, 
            `{} is required 
            [] is optional
            \`${prefix}trivia list\` to see list of trivia topics`
            ) 
        message.channel.send(listEmbed);
    },

    embeds(message, gameName, ran_key, timeBetween, players, playerArray, howManyTimes, howManyTimesCounter) {
        const questionEmbed = new Discord.RichEmbed()
            .setColor('#33cc33')
            .setTitle(`${gameName} Trivia - Question ${howManyTimesCounter+1} out of ${howManyTimes}`)
            .addField(`**${ran_key['question']}**`, this.numAnswers(ran_key)) 
            .setFooter(` You have ${timeBetween/1000} seconds`);

        const filter = (reaction, user) => {
            return reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧' 
            || reaction.emoji.name === '🇨' || reaction.emoji.name === '🇩' 
            || reaction.emoji.name === '🇪' || reaction.emoji.name === '😿' 
        };

        let answered;
        let numChoices = ran_key[`answers`].length;
        let correctAns = this.checkCorrectIndex(ran_key, numChoices);
        message.channel.send(questionEmbed).then(
            async msg => {
                const collector = msg.createReactionCollector(filter, { time: timeBetween*0.8 });
                collector.on('collect', (reaction, reactionCollector) => {
                    if (reaction.users.last().bot) {
                        return;
                    }
                    answered = true; 
                    if (!players.hasOwnProperty(reaction.users.last())) {
                        players[reaction.users.last()] = { 
                            'username' : reaction.users.last().username, 
                            'reaction' : reaction.emoji.name, 
                            'points' : 0,
                        };
                        playerArray.push(reaction.users.last());
                    }
                    else {
                        players[reaction.users.last()]['reaction'] = reaction.emoji.name;
                    }
                    switch(reaction.emoji.name) {
                        case "🇦":
                            if (correctAns == "🇦") {
                                players[reaction.users.last()]['points'] = players[reaction.users.last()]['points'] + 1;
                            }
                            break;
                        case "🇧":
                            if (correctAns == "🇧") {
                                players[reaction.users.last()]['points'] = players[reaction.users.last()]['points'] + 1;
                            }
                            break;
                        case "🇨": 
                            if (correctAns == "🇨") {
                                players[reaction.users.last()]['points'] = players[reaction.users.last()]['points'] + 1;
                            }
                            break;
                        case "🇩": 
                            if (correctAns == "🇩") {
                                players[reaction.users.last()]['points'] = players[reaction.users.last()]['points'] + 1;
                            }
                            break;
                        }
                    }
                );
                collector.on('end', collected => {
                    this.results(message, ran_key, players, playerArray, answered);
                    for (let i = 0; i < playerArray.length; i++) {
                        players[playerArray[i]]['reaction'] = "";
                    }
                    if (howManyTimesCounter == howManyTimes-1) {
                        this.endResults(message, players, playerArray, answered);
                    }
                });
                await msg.react("🇦")
                await msg.react("🇧")
                if (numChoices > 2) {
                    await msg.react("🇨")
                }
                if (numChoices > 3) {
                    await msg.react("🇩")
                }
                if (numChoices > 4) {
                    await msg.react("🇪") 
                }
            },
        );
    },

    results(message, ran_key, players, playerArray, answered) {
        if (!answered) { 
            return message.channel.send(`Nobody Answered the Question :(`); 
        }
        const answerEmbed = new Discord.RichEmbed()
            .setColor('#33cc33')
            .setTitle(`Answer`)
            .addField(`Correct Answer: **${ran_key['correct']}**`, this.playerAnswers(players, playerArray, ran_key))  
            .addField(`Top Scores`, this.scores(players, playerArray))  
        message.channel.send(answerEmbed);
    },

    endResults(message, players, playerArray, answered) {
        if (!answered) { 
            return message.channel.send(`Nobody even tried the quiz:'(`); 
        }
        let points = players[playerArray[0]]['points'];
        let player = players[playerArray[0]]['username'];
        for (let i = 1; i < playerArray.length; i++) {
            if (players[playerArray[i]]['points'] > points) {
                points = players[playerArray[i]]['points'];
                player = players[playerArray[i]]['username'];
            }
        }
        const answerEmbed = new Discord.RichEmbed()
            .setColor('#33cc33')
            .setTitle(`Trivia Quiz Finished`)
            .addField(`High IQ:`, `${player}: ${points} points `)  
            .addField(`Scores`, this.scores(players, playerArray))  
        message.channel.send(answerEmbed);
    },

    checkCorrectIndex(ran_key, size) {
        for(let i = 0; i < size; i++) {
            if (ran_key[`answers`][i] === ran_key['correct']) {
                switch(i) {
                    case 0:
                        return '🇦';
                    case 1:
                        return '🇧';
                    case 2: 
                        return '🇨';
                    case 3: 
                        return '🇩';
                    case 4: 
                        return '🇪';
                }
            }
        }
    },

    playerAnswers(players, playerArray, ran_key) {
        let str = ``;
        for (let i = 0; i < playerArray.length; i++) {
            let ans;
            console.log(players[playerArray[i]]['reaction']);
            switch(players[playerArray[i]]['reaction']) {
                case '🇦':
                    ans = ran_key[`answers`][0];
                case '🇧':
                    ans = ran_key[`answers`][1];
                case '🇨': 
                    ans = ran_key[`answers`][2];
                case '🇩': 
                    ans = ran_key[`answers`][3];
                case '🇪' : 
                    ans = ran_key[`answers`][4];
            }
            str = str + `${players[playerArray[i]]['username']}: ${players[playerArray[i]]['reaction']} \n`;
        }
        return str;
    },

    scores(players, playerArray) {
        let str = ``;
        for (let i = 0; i < playerArray.length; i++) {
            str = str + `${players[playerArray[i]]['username']}: ${players[playerArray[i]]['points']} \n`;
        }
        return str;
    },

    numAnswers(ran_key) {
        if(ran_key[`answers`].length == 2) {
            return `**A.** ${ran_key[`answers`][0]} \n` + 
            `**B.** ${ran_key[`answers`][1]}`
        }
        else if(ran_key[`answers`].length == 3) {
            return `**A.** ${ran_key[`answers`][0]} \n` + 
            `**B.** ${ran_key[`answers`][1]} \n` + 
            `**C.** ${ran_key[`answers`][2]}`
        }
        else if(ran_key[`answers`].length == 4) {
            return `**A.** ${ran_key[`answers`][0]} \n` + 
            `**B.** ${ran_key[`answers`][1]} \n` + 
            `**C.** ${ran_key[`answers`][2]} \n` + 
            `**D.** ${ran_key[`answers`][3]}`
        }
        else if(ran_key[`answers`].length == 5) {
            return `**A.** ${ran_key[`answers`][0]} \n` + 
            `**B.** ${ran_key[`answers`][1]} \n` + 
            `**C.** ${ran_key[`answers`][2]} \n` + 
            `**D.** ${ran_key[`answers`][3]} \n` + 
            `**E.** ${ran_key[`answers`][4]}`
        }
    },

    quiz(message, gameName, timeBetween, howManyTimesCounter, howManyTimes, gameData, obj_keys, players, playerArray) {
        let randomq = Math.floor(Math.random() *obj_keys.length);
        this.embeds(message, gameName, gameData['trivia'][randomq], timeBetween, players, playerArray, howManyTimes, howManyTimesCounter);
        obj_keys.splice(randomq, 1);
        howManyTimesCounter++;
        if (howManyTimesCounter < howManyTimes){
            setTimeout(() => { this.quiz(message, gameName, timeBetween, howManyTimesCounter, howManyTimes, gameData, obj_keys, players, playerArray); }, timeBetween );
        }
    }
};