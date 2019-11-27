const {RichEmbed, Attachment} = require('discord.js')
const GoogleImage = require('image-search-google')
const {saveGoogle, google_api} = require('../config.json')
const google = new GoogleImage('002055354797463638148:9or8ma2ess6', 'AIzaSyCh8b0Mkq4vEZVrK5CAYQIS41kD4KVMQZA');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'image',
    cooldown: 3,
	description: 'Show random image of whale',
	async execute(message, args) {
        try {
            const [result] = await google.search('whake', { page: 1 });
        
            if (!result) return await message.channel.send(':x: No images found!');
        
            const attachment = new Attachment(result.url);
            await message.channel.send(attachment);
          } catch(err) {
            console.error(err);
          }
    
    },

};