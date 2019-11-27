var Jimp = require('jimp');

module.exports = {
    name: 'whalesays',
	description: 'whalesays',
	async execute(message, args) {
        let str = "";
        let str2 = "";
        let str3 = "";
        let str4 = "";

        let i = 0;
        for (i; i < args.length; i++) {
            let tempstr = str + args[i];
            if (tempstr.length > 30) {
                break;
            }
            str = str + args[i] + " ";
        }
        for (i; i < args.length; i++) {
            let tempstr = str2 + args[i];
            if (tempstr.length > 30) {
                break;
            }
            str2 = str2 + args[i] + " ";
        }
        for (i; i < args.length; i++) {
            let tempstr = str3 + args[i];
            if (tempstr.length > 30) {
                break;
            }
            str3 = str3 + args[i] + " ";
        }
        for (i; i < args.length; i++) {
            let tempstr = str4 + args[i];
            if (tempstr.length > 30) {
                break;
            }
            str4 = str4 + args[i] + " ";
        }
        let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK) ;
        let pic = await Jimp.read('./assets/whalesays.png'); //We load the image from that link
        pic.print(font, 200, 55, str);
        pic.print(font, 200, 90, str2); 
        pic.print(font, 200, 125, str3); 
        pic.print(font, 200, 160, str4); 


        pic.write('whale.png'); //We create a png file called whale
        message.channel.send(``, { files: ["whale.png"] }); //We sent the file to the channel
    },
};