const fs = require('fs');
let { hunger, homeChannel, ocean, fishSpawn, squidSpawn, krillSpawn, fishDespawn, squidDespawn, krillDespawn, huntChance } = require('./mrwhale.json');

module.exports = {
    hunger(client) {
        let rand = Math.random(); 
        if (hunger <= 0) {
            console.log("CONSOLE: mr whale is VERY hungry");
            return;
        }
        let whaledata = fs.readFileSync(`./mrwhale.json`);
        let parsedWhaleData = JSON.parse(whaledata);

        if (rand*100 < parsedWhaleData[`hungerRate`]) {
            hunger = hunger-1;
            console.log("CONSOLE: whale hunger");
            client.channels.get(homeChannel).send(`debug: i just got a little hungrier`);
            parsedWhaleData[`hunger`] = hunger;
            parsedWhaleData = JSON.stringify(parsedWhaleData);
            fs.writeFileSync(`./mrwhale.json`, parsedWhaleData);
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
        if (rand < (fishSpawn/100)) {
            let fishSpawnMessage = ["A 🐟 has appeared!", "🐟 spotted!", "A 🐟 is near!", "Here comes a 🐟!",  
                                    "A 🐟 has swam by", "Look, a 🐟!", "Here comes a 🐟", "a 🐟 floats by",]
            let size = fish.length;    
            newFish = {
                "name" : size,
                "time" : 0
            }    
            fish.push(newFish);
            fishSpawnMessage[Math.floor(Math.random()*fishSpawnMessage.length)]
            client.channels.get(ocean).send(`${fishSpawnMessage[Math.floor(Math.random()*fishSpawnMessage.length)]}`)
            .then(msg => {
                //20 min
                msg.delete(120000000)
              });
            console.log(fish);
            return;
        }
        rand = Math.random();
        if (rand < (squidSpawn/90)) {
            let squidSpawnMessage = ["A 🦑 has appeared!", "🦑 spotted!", "A 🦑 is near!", "Here comes a 🦑!",  
                                     "A 🦑 has swam by", "Look, a 🦑!", "Here comes a 🦑", "a 🦑 floats by",]
            let size = squid.length;    
            newSquid = {
                "name" : size,
                "time" : 0
            }    
            squid.push(newSquid);
            client.channels.get(ocean).send(`${squidSpawnMessage[Math.floor(Math.random()*squidSpawnMessage.length)]}`)
            .then(msg => {
                //20 min
                msg.delete(120000000)
              });
            console.log(squid);
            return;
        }
        rand = Math.random();
        if (rand < (krillSpawn/80)) {
            let krillSpawnMessage = ["A 🦐 has appeared!", "🦐 spotted!", "A 🦐 is near!", "Here comes a 🦐!",  
                                     "A 🦐 has swam by", "Look, a 🦐!", "Here comes a 🦐", "a 🦐 floats by",]
            let size = krill.length;    
            newKrill = {
                "name" : size,
                "time" : 0
            }    
            krill.push(newKrill);
            client.channels.get(ocean).send(`${krillSpawnMessage[Math.floor(Math.random()*krillSpawnMessage.length)]}`)
            .then(msg => {
                //20 min
                msg.delete(120000000)
              });
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
                if (time > 20) {
                    //console.log(time);
                    let rand = Math.random();
                    if (rand > (fishDespawn/100)) {
                        let fishDespawnMessage = ["the 🐟 has left", "the 🐟 left", "the 🐟 swam away", "the 🐟 has swam away", 
                                                  "the 🐟 is gone", "the 🐟 has left these waters", "the 🐟 is no longer here", ]
                        deletedFish.push(i);
                        client.channels.get(ocean).send(`${fishDespawnMessage[Math.floor(Math.random()*fishDespawnMessage.length)]}`)
                        .then(msg => {
                            //20 min
                            msg.delete(120000000)
                          });
                        console.log("fish despawned");
                        //console.log(deletedFish);
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
                if (time > 20) {
                    console.log(time);
                    let rand = Math.random();
                    if (rand > (squidDespawn/100)) {
                        let squidDespawnMessage = ["the 🦑 has left", "the 🦑 left", "the 🦑 swam away", "the 🦑 has swam away", 
                                                   "the 🦑 is gone", "the 🦑 has left these waters", "the 🦑 is no longer here", ]
                        deletedSquid.push(i);
                        client.channels.get(ocean).send(`${squidDespawnMessage[Math.floor(Math.random()*squidDespawnMessage.length)]}`)
                        .then(msg => {
                            //20 min
                            msg.delete(120000000)
                          });
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
                if (time > 20) {
                    console.log(time);
                    let rand = Math.random();
                    if (rand > (krillDespawn/100)) {
                        let krillDespawnMessage = ["the 🦐 has left", "the 🦐 left", "the 🦐 swam away", "the 🦐 has swam away", 
                                                   "the 🦐 is gone", "the 🦐 has left these waters", "the 🦐 is no longer here", ]
                        deletedKrill.push(i);
                        client.channels.get(ocean).send(`${krillDespawnMessage[Math.floor(Math.random()*krillDespawnMessage.length)]}`)
                        .then(msg => {
                            //20 min
                            msg.delete(120000000)
                          });
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
    },
    hungerMessage(client) {
        let whaledata = fs.readFileSync(`./mrwhale.json`);
        let parsedWhaleData = JSON.parse(whaledata);

        let rand = Math.random();
        if (parsedWhaleData.hunger < 4 && rand > 0.9) {
            let extremeHungerMessage = [
                "I AM STARVING", 
                "I am super super hungry", 
                "PLEASE FEED ME", 
                "I am starving", 
                "I haven't eaten all day. Please feed me",
                "I am really hungry right now", 
                "I need food NOW",
                "I haven't eaten in so long",
                "This hunger hurts :crying_dog_face:",
            ]
            client.channels.get(homeChannel).send(`${extremeHungerMessage[Math.floor(Math.random()*extremeHungerMessage.length)]}`);
        }
        else if (parsedWhaleData.hunger < 6 && rand > 0.5) {
            let HungerMessage = [
                "feed me please", 
                "please feed me", 
                "I'm hungry", 
                "I could use a meal", 
                "my tummy is growling", 
                "feed me so I can stay healthy!", 
                "can I have a squid?", 
                "can I have a fish?", 
                "can I have some shrimp?",
                "I haven't eaten in awhile. I'm hungry",
                "I haven't eaten in awhile",
            ]
            client.channels.get(homeChannel).send(`${HungerMessage[Math.floor(Math.random()*HungerMessage.length)]}`);
        }
        else if (parsedWhaleData.hunger < 10 && rand > 0.15) {
            let mildHungerMessage = [
                "A little food would be nice", 
                "Can I have a little snack", 
                "I am kind of hungry", 
                "I crave a shrimp right now",
                "Can I have some food",
                "I am a little hungry",
                "A fish or shrimp would make me happier"
            ]
            client.channels.get(homeChannel).send(`${mildHungerMessage[Math.floor(Math.random()*mildHungerMessage.length)]}`);
        }
    },

    whaleFeed(client) {
        let whaledata = fs.readFileSync(`./mrwhale.json`);
        let parsedWhaleData = JSON.parse(whaledata);
        if (parsedWhaleData['hunger'] == 15) {
            return;
        }
        let adjustedChance = parseInt(huntChance)/100;
        if (parsedWhaleData['hunger'] < 3) {
        }
        else if (parsedWhaleData['hunger'] < 6) {
            adjustedChance = adjustedChance*0.75;
        }
        else if (parsedWhaleData['hunger'] < 10) {
            adjustedChance = adjustedChance*0.4;
        }
        else if (parsedWhaleData['hunger'] < 15) {
            adjustedChance = adjustedChance*0.15;
        }
        let rand = Math.random();
        if (rand > (1 - adjustedChance)) {
            console.log('feedtest');
            let rand2 = Math.random();
            let typeFood = "fish";
            if (rand2 > 0.66) {
                if (parsedWhaleData['hunger'] >= 14) {
                    parsedWhaleData['hunger'] = 15;
                }
                else {
                    parsedWhaleData['hunger'] = parsedWhaleData['hunger'] + 1;
                }
                typeFood = "krill"
            }
            else if (rand2 > 0.33) {
                if (parsedWhaleData['hunger'] >= 13) {
                    parsedWhaleData['hunger'] = 15;
                }
                else {
                    parsedWhaleData['hunger'] = parsedWhaleData['hunger'] + 2;
                }
            }
            else if (rand2 > 0) {
                if (parsedWhaleData['hunger'] >= 12) {
                    parsedWhaleData['hunger'] = 15;
                }
                else {
                    parsedWhaleData['hunger'] = parsedWhaleData['hunger'] + 3;
                }
                typeFood = "squid"
            }
            let catchMessage = [
                `I have found and eaten a ${typeFood} yay. My hunger is now at ${parsedWhaleData['hunger']}`, 
                `I just caught a ${typeFood} by myself.`, 
                `I got a little hungry so i caught a ${typeFood}`, 
                `I just caught a ${typeFood}`, 
                `Yum. I just caught a ${typeFood}`, 
                `Don't want to feed me? I had to catch ${typeFood} by myself`, 
            ]
            client.channels.get(homeChannel).send(`${catchMessage[Math.floor(Math.random()*catchMessage.length)]}`);
            whaleData = JSON.stringify(parsedWhaleData);
            fs.writeFileSync(`./mrwhale.json`, whaleData);
        }
    }
};