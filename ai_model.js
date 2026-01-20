class Ch9tGPT {
    constructor() {
        this.memory = []; // Only plain text
        this.fileData = []; // Learned content from uploads
        this.personality = { mood: "curious", friendliness: 0.8, humor: 0.4 };
        this.temperature = 0.7; // randomness for creativity
    }

    remember(message) {
        this.memory.push(message);
        this.saveMemory();
    }

    saveMemory() {
        localStorage.setItem("ch9tGPT_memory", JSON.stringify(this.memory));
        localStorage.setItem("ch9tGPT_files", JSON.stringify(this.fileData));
    }

    loadMemory() {
        const mem = localStorage.getItem("ch9tGPT_memory");
        const files = localStorage.getItem("ch9tGPT_files");
        if(mem) this.memory = JSON.parse(mem);
        if(files) this.fileData = JSON.parse(files);
    }

    learnFromFile(fileObj) {
        this.fileData.push(fileObj);
        this.saveMemory();
    }

    adjustMood(input){
        const text = input.toLowerCase();
        if(text.includes("sad") || text.includes("unhappy")) this.personality.mood="comforting";
        else if(text.includes("happy") || text.includes("great")) this.personality.mood="happy";
        else this.personality.mood="curious";
        // small chance to add humor
        if(Math.random() < 0.2) this.personality.mood="playful";
    }

    generateResponse(input){
        this.remember(input);

        // Combine recent memory and file data
        const recent = this.memory.slice(-20).join(" ");
        const fileContext = this.fileData.map(f => f.text || "").join(" ");
        const context = recent + " " + fileContext + " " + input;

        // Tokenize context
        const words = context.split(/\s+/);
        let response = "";
        const length = Math.min(12 + Math.floor(Math.random()*15), words.length);

        for(let i=0;i<length;i++){
            const idx = Math.floor(Math.random() * words.length);
            response += words[idx] + " ";
        }

        // Personality / mood twist
        response = response.trim();
        if(this.personality.mood === "happy") response = "😄 " + response;
        else if(this.personality.mood === "curious") response = "🤔 " + response;
        else if(this.personality.mood === "playful") response = "😏 " + response;
        else if(this.personality.mood === "comforting") response = "💙 " + response;

        // Capitalize first letter + punctuation
        response = response.charAt(0).toUpperCase() + response.slice(1);
        if(!/[.!?]$/.test(response)) response += ".";

        this.remember(response);
        return response;
    }
}

const bot = new Ch9tGPT();
bot.loadMemory();