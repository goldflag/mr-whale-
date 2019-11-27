const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'votekick',
	description: 'vote to kick a player',
	execute(message, args) {
        let numYay = 0;
        let numNay = 0;
        const kickEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Vote to Kick')
        .setThumbnail(args[0].avatarURL)        
        .setDescription(`Should ${args[0]} be kicked?`)
        .addField(`Reason`, `for being chad and stealing our women`)

        const filter = (reaction, user) => {
            return reaction.emoji.name === '✅' || reaction.emoji.name === '❎' 
        };

        message.channel.send(kickEmbed).then(
            async msg => {
                const collector = msg.createReactionCollector(filter, { time: 30 });
                collector.on('collect', (reaction, reactionCollector) => {
                    if (reaction.users.last().bot) {
                        return;
                    }
                    switch(reaction.emoji.name) {
                        case "✅":
                            numYay = numYay + 1;
                        case "❎":
                            numNay = numNay + 1;
                        }
                    }
                );
                collector.on('end', collected => {
                    if (numYay > numNay) {
                        message.guild.kick(args[0]);
                        const kickEmbed2 = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('The People Have Spoken')
                        .setThumbnail(args[0].avatarURL)        
                        .addField(`Justice has been served`, `${args[0]} has been kicked`)
                        message.channel.send(kickEmbed2)
                    }
                    else {
                        const failEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('The People Have Spoken')
                        .setThumbnail(args[0].avatarURL)        
                        .addField(`No punishment levied`, `${args[0]} will not be kicked`)
                        message.channel.send(failEmbed)
                    }
                });
                await msg.react("✅")
                await msg.react("❎")
            },
        );
    },
};