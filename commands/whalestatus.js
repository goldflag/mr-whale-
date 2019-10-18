const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'whalestatus',
	description: 'See the current status of mr whale',
	execute(message, args) {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let hungerBar = this.hungerCalculator();
        const statusEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('My Current Status')
            //.setURL('https://discord.js.org/')
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            //.setDescription('Some description here')
            //.attachFiles(['./assets/mrwhale.png'])
            //.setThumbnail('attachment://mrwhale.png')
            .addField('My Hunger: ' + `**${whaleData["hunger"]}/15**`, "\```" + hungerBar + "\```")
            //.addBlankField()
            .addField('Hunger Rate', `**${whaleData["hungerRate"]}**` , true)
            .addField('Mood', `**Smileywhale**`, true)
            .addField('Inline field title', 'Some value here', true)
            .addField('Inline field title', 'Some value here', true)
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            //.setTimestamp()
            //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        message.channel.send(statusEmbed);
    },

    hungerCalculator() {
        let data = fs.readFileSync(`./mrwhale.json`);
        let whaleData = JSON.parse(data);
        let hunger = whaleData['hunger'];
        let bar = '';
        for (let i = 0; i < hunger; i++) {
            bar = bar + '🔴';
        }
        for (let i = 0; i < (15 - hunger); i++) {
            bar = bar + '⚪';
        }
        return bar;
    }
};