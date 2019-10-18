const fs = require('fs');
const { prefix } = require('./config.json');
let { hunger, homeChannel } = require('./mrwhale.json');
const Discord = require('discord.js');

module.exports = {

    hunger(cmd, message) {
        let rand = Math.random(); 
        if (hunger <= 0) {
            console.log("CONSOLE: mr whale is VERY hungry");
            return;
        }
        let whaledata = fs.readFileSync(`./mrwhale.json`);
        let parsedWhaleData = JSON.parse(whaledata);

        if (rand*100 < parsedWhaleData[`hungerRate`]) {
            hunger = hunger-1;
            parsedWhaleData[`hunger`] = hunger;
            parsedWhaleData = JSON.stringify(parsedWhaleData);
            fs.writeFileSync(`./mrwhale.json`, parsedWhaleData);
            console.log("CONSOLE: whale hunger");
        }
    },
    hi(message) {
        let nick = JSON.parse(fs.readFileSync(`storage/${message.member.id}.json`))["nick"];
        let rand = Math.random();
        if (rand < 0.4) { return("hi"); }
        else if (rand < 0.7) { return("Hi"); }
        else if (rand < 0.72) { return("Hu"); }
        else if (rand < 0.74) { return("hu"); }
        else if (rand < 0.76) { return("ho"); }
        else if (rand < 0.78) { return("Ho"); }
        else if (rand < 0.80) { return("ji"); }
        else if (rand < 0.82) { return("ih"); }
        else if (rand < 0.84) { return("Ih"); }
        else if (rand < 0.92) { return("hi " + nick); }
        else if (rand < 1) { return("Hi " + nick); }
    },
    checkPlayer(user) {
        if (!fs.existsSync(`storage/${user.id}.json`)) {
            let newFile = { 
                id : user.id,
                name : user.username,
                nick : user.username,
                fish : 0,
                squid : 0,
                krill : 0,
            };
            let data = JSON.stringify(newFile);
            fs.writeFileSync(`./storage/${user.id}.json`, data);
        }
    },
    fishSpawn(client, fish, squid, krill) {
        let rand = Math.random();
        if (rand < 0.2) {
            let size = fish.length;    
            newFish = {
                "name" : size,
                "time" : 0
            }    
            fish.push(newFish);
            client.channels.get(homeChannel).send('🐟 has spawned');
            console.log(fish);
            return;
        }
        rand = Math.random();
        if (rand < 0.2) {
            let size = squid.length;    
            newSquid = {
                "name" : size,
                "time" : 0
            }    
            squid.push(newSquid);
            client.channels.get(homeChannel).send('🦑 has spawned');
            console.log(squid);
            return;
        }
        rand = Math.random();
        if (rand < 0.2) {
            let size = krill.length;    
            newKrill = {
                "name" : size,
                "time" : 0
            }    
            krill.push(newKrill);
            client.channels.get(homeChannel).send('🦐 has spawned');
            console.log(krill);
            return;
        }
    },
    fishDespawn(client, fish, squid, krill) {
        let fishSize = fish.length;
        let squidSize = squid.length;
        let krillSize = krill.length;

        let deletedFish = [];
        let deletedSquid = [];
        let deletedKrill = [];

        if (fishSize > 0) {
            for (let i = 0; i < fish.length; i++) {
                let time = fish[i]["time"];
                if (time > 10) {
                    console.log(time);
                    let rand = Math.random();
                    if (rand > 0.7) {
                        deletedFish.push(i);
                        client.channels.get(homeChannel).send('🐟 has despawned');
                        console.log("fish despawned");
                        console.log(deletedFish);
                    }
                }
                fish[i]["time"] = fish[i]["time"] + 1;
            }
            if (deletedFish.length > 0) {
                for (let i = 0; i < deletedFish.length; i++ ) {
                    fish.splice(i,1);
                }
                for (let i = 0; i < fish.length; i++) {
                    fish[i]["name"] = i;
                }
            }
        }
        if (squidSize > 0) {
            for (let i = 0; i < squid.length; i++) {
                let time = squid[i]["time"];
                if (time > 10) {
                    console.log(time);
                    let rand = Math.random();
                    if (rand > 0.7) {
                        deletedSquid.push(i);
                        client.channels.get(homeChannel).send('🦑 has despawned');
                        console.log("squid despawned");
                        console.log(deletedSquid);
                    }
                }
                squid[i]["time"] = squid[i]["time"] + 1;
            }
            if (deletedSquid.length > 0) {
                for (let i = 0; i < deletedSquid.length; i++ ) {
                    squid.splice(i,1);
                }
                for (let i = 0; i < squid.length; i++) {
                    squid[i]["name"] = i;
                }
            }        
        }
        if (krillSize > 0) {
            for (let i = 0; i < krill.length; i++) {
                let time = krill[i]["time"];
                if (time > 10) {
                    console.log(time);
                    let rand = Math.random();
                    if (rand > 0.7) {
                        deletedKrill.push(i);
                        client.channels.get(homeChannel).send('🦐 has despawned');
                        console.log("krill despawned");
                        console.log(deletedKrill);
                    }
                }
                krill[i]["time"] = krill[i]["time"] + 1;
            }
            if (deletedKrill.length > 0) {
                for (let i = 0; i < deletedKrill.length; i++ ) {
                    krill.splice(i,1);
                }
                for (let i = 0; i < krill.length; i++) {
                    krill[i]["name"] = i;
                }
            }           
        }
    }
};