class Ch9tGPT {
    constructor() {
        this.memory = []; // Only plain strings
        this.fileData = []; // Uploaded content (text only for AI)
        this.personality = { mood: "curious", friendliness: 0.8, humor: 0.4 };
    }

    // Remember only strings
    remember(message) {
        if (typeof message === "string" && message.trim() !== "") {
            this.memory.push(message);
            this.saveMemory();
        }
    }

    // Save memory and file data to localStorage
    saveMemory() {
        localStorage.setItem("ch9tGPT_memory", JSON.stringify(this.memory));
        localStorage.setItem("ch9tGPT_files", JSON.stringify(this.fileData));
    }

    // Load memory from localStorage and clean old invalid data
    loadMemory() {
        const mem = localStorage.getItem("ch9tGPT_memory");
        const files = localStorage.getItem("ch9tGPT_files");

        if (mem) {
            try { 
                this.memory = JSON.parse(mem).filter(m => typeof m === "string");
            } catch { this.memory = []; }
        }

        if (files) {
            try {
                this.fileData = JSON.parse(files).map(f => ({
                    type: f.type || "",
                    name: f.name || "",
                    text: typeof f.text === "string" ? f.text : ""
                }));
            } catch { this.fileData = []; }
        }
    }

    // Learn from uploaded file (only text)
    learnFromFile(fileObj) {
        const textContent = fileObj.text ? fileObj.text : "";
        this.fileData.push({ type: fileObj.type, name: fileObj.name, text: textContent });
        this.saveMemory();
    }

    // Adjust AI mood based on user input
    adjustMood(input) {
        const text = input.toLowerCase();
        if (text.includes("sad") || text.includes("unhappy")) this.personality.mood = "comforting";
        else if (text.includes("happy") || text.includes("great")) this.personality.mood = "happy";
        else this.personality.mood = "curious";

        if (Math.random() < 0.2) this.personality.mood = "playful";
    }

    // Generate a human-like response
    generateResponse(input) {
        this.remember(input);

        // Build context (recent memory + file text)
        const recent = this.memory.slice(-20);
        const fileContext = this.fileData.map(f => f.text).filter(t => t);
        const context = [...recent, ...fileContext, input].join(" ");

        // Sentence templates for human-like responses
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

        // Pick a random template and insert input
        let template = templates[Math.floor(Math.random() * templates.length)];
        let response = template.replace("{input}", input);

        // Mood twist
        if (this.personality.mood === "happy") response = "😄 " + response;
        else if (this.personality.mood === "curious") response = "🤔 " + response;
        else if (this.personality.mood === "playful") response = "😏 " + response;
        else if (this.personality.mood === "comforting") response = "💙 " + response;

        // Capitalize first letter & add punctuation if missing
        response = response.charAt(0).toUpperCase() + response.slice(1);
        if (!/[.!?]$/.test(response)) response += ".";

        this.remember(response);
        return response;
    }
}

// Create bot instance and load memory
const bot = new Ch9tGPT();
bot.loadMemory();