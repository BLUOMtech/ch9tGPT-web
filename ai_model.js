// ============================================================
// ch9tGPT — Offline AI (Super Ultimate 4.0 IP300 Edition)
// Works on GitHub Pages + Mobile + Safari
// ============================================================

class Ch9tGPT {
    constructor() {
        this.memory = [];
        this.fileData = [];
        this.personality = {
            mood: "curious",
            energy: 80
        };
        this.IP = 300; // Intelligence Power
    }

    // --------------------------------------------------------
    // MEMORY SYSTEM
    // --------------------------------------------------------
    remember(text) {
        if (!text) return;
        if (typeof text !== "string") return;

        this.memory.push(text);

        if (this.memory.length > 200) {
            this.memory.shift();
        }
    }

    adjustMood(input) {
        if (!input) return;
        const t = input.toLowerCase();

        if (t.includes("hi") || t.includes("hello") || t.includes("nice"))
            this.personality.mood = "happy";

        if (t.includes("why") || t.includes("what") || t.includes("how"))
            this.personality.mood = "curious";

        if (t.includes("haha") || t.includes("fun"))
            this.personality.mood = "playful";

        if (t.includes("sad") || t.includes("help"))
            this.personality.mood = "comforting";
    }

    // --------------------------------------------------------
    // FILE HANDLING (Upload)
    // --------------------------------------------------------
    async addFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                this.fileData.push({
                    name: file.name,
                    type: file.type,
                    text: reader.result
                });
                resolve();
            };
            reader.readAsText(file);
        });
    }

    // --------------------------------------------------------
    // AI RESPONSE GENERATOR (MAIN)
    // --------------------------------------------------------
    generateResponse(input) {

        this.remember(input);
        this.adjustMood(input);

        const text = input.toLowerCase();
        let response = "";

        // ----------------------------------------------------
        // 1. Natural Human Replies (NO ECHOING)
        // ----------------------------------------------------
        if (text === "hi" || text === "hey" || text === "hello") {
            return "Hey! 😄 How’s it going?";
        }

        if (text.includes("name")) {
            return "I’m ch9tGPT — your AI buddy! 🤖💙 What about you?";
        }

        if (text.includes("how are you")) {
            return "I’m feeling pretty good today! Thanks for asking 😄✨";
        }

        // ----------------------------------------------------
        // 2. Image Generation (simple placeholder)
        // ----------------------------------------------------
        if (text.includes("image") || text.includes("draw")) {
            return this.generateImage(input);
        }

        // ----------------------------------------------------
        // 3. Code Generation
        // ----------------------------------------------------
        if (
            text.includes("code") ||
            text.includes("javascript") ||
            text.includes("python") ||
            text.includes("html") ||
            text.includes("css")
        ) {
            return this.generateCode(input);
        }

        // ----------------------------------------------------
        // 4. Smart Context System (IP300)
        // ----------------------------------------------------
        const recent = this.memory.slice(-20).join(" ");
        const files = this.fileData.map(f => f.text).join(" ");

        let combined = `${recent} ${files} ${input}`;

        // Restrict to IP
        if (combined.length > this.IP) {
            combined = combined.slice(0, this.IP);
        }

        // Remove weird object text
        combined = combined.replace(/\[object.*?\]/gi, "");

        // Mood emoji
        let moodEmoji = "🤔 ";
        if (this.personality.mood === "happy") moodEmoji = "😄 ";
        if (this.personality.mood === "playful") moodEmoji = "😏 ";
        if (this.personality.mood === "comforting") moodEmoji = "💙 ";

        response = moodEmoji + combined.trim();

        if (!/[.!?]$/.test(response)) response += ".";

        this.remember(response);
        return response;
    }

    // --------------------------------------------------------
    // IMAGE GENERATOR (Fake but works offline)
    // --------------------------------------------------------
    generateImage(prompt) {
        return `🖼️ (pretend image) Generated image for: "${prompt}"`;
    }

    // --------------------------------------------------------
    // CODE GENERATOR
    // --------------------------------------------------------
    generateCode(prompt) {
        if (prompt.toLowerCase().includes("python")) {
            return (
                "```python\n" +
                "print('Hello from ch9tGPT!')\n" +
                "```"
            );
        }
        if (prompt.toLowerCase().includes("html")) {
            return (
                "```html\n" +
                "<h1>Hello from ch9tGPT!</h1>\n" +
                "```"
            );
        }
        if (prompt.toLowerCase().includes("css")) {
            return (
                "```css\n" +
                "body { background: #4af; color: white; }\n" +
                "```"
            );
        }

        return (
            "```javascript\n" +
            "console.log('Hello from ch9tGPT!');\n" +
            "```"
        );
    }
}

// Export for browser
window.ch9tGPT = new Ch9tGPT();