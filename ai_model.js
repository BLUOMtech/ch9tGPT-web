class Ch9tGPT {
    constructor() {
        this.memory = []; // Conversation memory
        this.fileData = []; // Uploaded files
        this.personality = { mood: "curious", friendliness: 0.8, humor: 0.5 };
        this.temperature = 0.7; // randomness
        this.wordEmbeddings = {}; // Mini embeddings for generative response
    }

    // Memory management
    remember(text, source="text") {
        this.memory.push({ content: text, source: source, timestamp: Date.now() });
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

    // Learn from files
    learnFromFile(fileObj) {
        this.fileData.push(fileObj);
        this.saveMemory();
    }

    // Mini neural network inspired text generation
    generateResponse(input) {
        this.remember("You: " + input);

        // Combine recent memory + files
        const recent = this.memory.slice(-20).map(m=>m.content).join(" ");
        const files = this.fileData.map(f => f.text || "").join(" ");
        const context = recent + " " + files + " " + input;

        // Tokenize and build response
        const words = context.split(/\s+/);
        let response = "";
        const length = Math.min(25 + Math.floor(Math.random()*10), words.length);

        for(let i=0;i<length;i++){
            const idx = Math.floor(Math.random() * words.length);
            // Introduce randomness
            if(Math.random() < this.temperature) response += words[idx] + " ";
        }

        // Personality adjustment
        if(this.personality.mood === "happy") response = "😄 " + response;
        if(this.personality.mood === "curious") response = "Hmm… " + response;
        if(Math.random() < this.personality.humor) response += " 😏";

        response = response.trim();
        response = response.charAt(0).toUpperCase() + response.slice(1) + ".";
        this.remember("ch9tGPT: " + response);

        return response;
    }

    // Mood adjustment based on sentiment
    adjustMood(input){
        if(input.includes("sad") || input.includes("unhappy")) this.personality.mood="comforting";
        if(input.includes("happy") || input.includes("great")) this.personality.mood="happy";
        if(input.includes("bored")) this.personality.mood="curious";
    }
}

const bot = new Ch9tGPT();
bot.loadMemory();