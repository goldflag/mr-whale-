//const Discord = require('discord.js');
const Calculator = require('./functions.js');

module.exports = {
    read(msg, name, prefix) {
        if(msg.toUpperCase() == ('HI') || msg.toUpperCase().includes('HI MR WHALE') ) { return this.hi(name);}

        else if(msg.toUpperCase().includes("MR WHALE") 
        && msg.toUpperCase().includes("COOL FACT") 
        || msg.toUpperCase().includes("TELL US A FACT") 
        || msg.toUpperCase().includes("TELL A FACT")
        || msg.toUpperCase().includes("SAY A FACT") 
        || msg.toUpperCase().includes("GIVE US A FACT")
        || msg.toUpperCase().includes("GIVE A FACT")
        || msg.toUpperCase().includes("TELL US ANOTHER FACT") 
        || msg.toUpperCase().includes("TELL ANOTHER FACT")
        || msg.toUpperCase().includes("SAY ANOTHER FACT") 
        || msg.toUpperCase().includes("GIVE US ANOTHER FACT")
        || msg.toUpperCase().includes("GIVE ANOTHER FACT")
        ) { return this.coolfact();}
    
        else if((msg.toUpperCase().includes("ZUOAI") 
        || msg.toUpperCase().includes("SEX")) 
        && msg.toUpperCase().includes("BILL") 
        && msg.toUpperCase().includes("JESSICA")
        && !msg.toUpperCase().includes("NOT")
        ) { return this.sex();}
    
        if(msg.startsWith(`${prefix}what is`)) {
            return(Calculator.add(1,2));
        }
    
        if(msg.startsWith("thanks mr whale")) {
            return("you're welcome " + name);
        }
    
        if(msg.includes("what type of whale") || msg.includes("what kind of whale")) {
            return("*i am a humpback whale*");
        }
    
        if(msg.includes("harpoon")) {
            return("stop that is tramautizing ");
        }
    
        if(msg.includes("alex") && name != 'mr whale' ) {
            return("alex is ugly and should die");
        }
    
        if(msg.includes("Alex") && name != 'mr whale' ) {
            return("alex doesnt deserve a capital a");
        }
    
        if(msg.includes("who is ugly") && name != 'mr whale' ) {
            return(":alex:");
        }
        return ("no message");
    },
    hi(name) {
        let rand = Math.random();
        if (rand < 0.15) { return("hi"); }
        else if (rand < 0.3) { return("Hi"); }
        else if (rand < 0.31) { return("Hu"); }
        else if (rand < 0.32) { return("hu"); }
        else if (rand < 0.33) { return("ho"); }
        else if (rand < 0.34) { return("Ho"); }
        else if (rand < 0.36) { return("ji"); }
        else if (rand < 0.38) { return("ih"); }
        else if (rand < 0.39) { return("Ih"); }
        else if (rand < 0.41) { return("hi " + name); }
        else if (rand < 0.43) { return("Hi " + name); }
        else {
            return ("no message");
        }
    },
    sex() {
        let myArray = [
            "smileywhale yea",
            "i want to watch",
            "yes and no condom",
            "Yes and no condom",
            "yes and no protection",
            "Yes and no protection",
            "hot",
            "stop asking me that",
            "yea it will make me really happy",
            "heart eyes cat",
            "i hope jessica will get pregnant",
            "smileywhale",
            "I would want to be right there",
            "on jessica's bed",
            "on bill's bed",
            "after I take out alex",
            "of course",
            "yea",
            "Yea",
            "Ya",
            "ya",
            "duh",
            "obviously",
            "Obviously",
            "it will make me a happy whale",
            "screamcat",
            "smileycat",
            "what do u think",
            "fucking feed me",
          ];
          let randomItem = myArray[Math.floor(Math.random()*myArray.length)];
        return randomItem;
    },
    coolfact() {
        let myArray = [
            "weves is gone forever",
            "I am a whalecel",
            "goldstein wants your labor",
            "Jessica is smart",
            "alex has cuckold fantasies",
            "alex thinks minecraft is stupid",
            "alex is nasty",
            "Humpback whales are the best",
            "The mitochondria is the powerhouse of the cell",
            "I love jessica",
            "it's dogogre",
            "JBW is true",
            "cope, hope, rope - thats the cycle of life",
            "Russians are bad because they killed a lot of whales",
            "Whale gestation can take up to 16 months",
            "harpoons scare me",
            "pulling out is an effective method of birth control",
          ];
          let randomItem = myArray[Math.floor(Math.random()*myArray.length)];
        return randomItem;
    }
};