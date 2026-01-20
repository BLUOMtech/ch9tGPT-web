class Ch9tGPT {
    constructor() {
        this.memory = []; // only strings
        this.fileData = []; // uploaded file text
        this.personality = { mood: "curious", friendliness: 0.8, humor: 0.4 };
    }

    remember(message) {
        if(typeof message === "string" && message.trim() !== "")
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

        if(mem) this.memory = JSON.parse(mem).filter(m=>typeof m==="string");
        if(files) this.fileData = JSON.parse(files).map(f=>({
            type: f.type||"",
            name: f.name||"",
            text: typeof f.text==="string"?f.text:""
        }));
    }

    learnFromFile(fileObj) {
        const textContent = fileObj.text ? fileObj.text : "";
        this.fileData.push({type:fileObj.type, name:fileObj.name, text:textContent});
        this.saveMemory();
    }

    adjustMood(input) {
        const text = input.toLowerCase();
        if(text.includes("sad") || text.includes("unhappy")) this.personality.mood="comforting";
        else if(text.includes("happy") || text.includes("great")) this.personality.mood="happy";
        else this.personality.mood="curious";
        if(Math.random() < 0.2) this.personality.mood="playful";
    }

    generateResponse(input) {
        this.remember(input);

        // Build context (memory + files)
        const recent = this.memory.slice(-20);
        const fileContext = this.fileData.map(f=>f.text).filter(t=>t);
        const context = [...recent, ...fileContext].join(" ");

        // Templates for human-like sentences
        const templates = [
            "I think '{input}' sounds interesting.",
            "Hmm… '{input}'? Tell me more!",
            "Wow! '{input}' really makes me curious.",
            "I see, so you mean '{input}'.",
            "😏 '{input}'… that's funny!",
            "🤔 Let me think about '{input}'.",
            "Haha, '{input}' sounds cool!",
            "Interesting… '{input}' is quite something.",
            "Oh! '{input}'? Tell me the story behind it.",
            "💡 '{input}'… that gives me an idea!"
        ];

        let template = templates[Math.floor(Math.random()*templates.length)];
        let response = template.replace("{input}", input);

        // Mood twist
        if(this.personality.mood==="happy") response="😄 "+response;
        else if(this.personality.mood==="curious") response="🤔 "+response;
        else if(this.personality.mood==="playful") response="😏 "+response;
        else if(this.personality.mood==="comforting") response="💙 "+response;

        response = response.charAt(0).toUpperCase()+response.slice(1);
        if(!/[.!?]$/.test(response)) response+=".";

        this.remember(response);
        return response;
    }
}

// Initialize bot
const bot = new Ch9tGPT();
bot.loadMemory();
