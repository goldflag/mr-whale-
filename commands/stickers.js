const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'stickers',
    cooldown: 15,
	description: 'See all the stickers',
	execute(message, args) {
        const helpEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        .setDescription('__List of Snapchat Sticker Commands__')
        .attachFiles(['./assets/mrwhale.png'])
        .setThumbnail('attachment://mrwhale.png')        
        .addField(`catdog Stickers`, 
        `
         ${prefix}anythingforyou
         ${prefix}byefornow
         ${prefix}catdogheart
         ${prefix}catdogheart2
         ${prefix}giveheart
         ${prefix}heartgoes
         ${prefix}hello
         ${prefix}hi
         ${prefix}imcoming
         ${prefix}imflying
         ${prefix}iminlove
         ${prefix}imissyou
         ${prefix}imissyoutoo
         ${prefix}imsolucky
         ${prefix}ineedyou
         ${prefix}mine
         ${prefix}mybae
         ${prefix}ohhoney
         ${prefix}seeyousoon
        `
        )
        message.channel.send(helpEmbed);
    },
};