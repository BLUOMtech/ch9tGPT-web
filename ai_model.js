class Ch9tGPT {
    constructor() {
        this.memory = [];
        this.fileData = [];
        this.personality = { mood: "curious", energy: 80 };
        this.IP = 300;
    }

    remember(t){
        if(typeof t !== "string") return;
        this.memory.push(t);
        if(this.memory.length > 200) this.memory.shift();
    }

    adjustMood(t){
        t = t.toLowerCase();
        if(t.includes("hi") || t.includes("hello")) this.personality.mood = "happy";
        if(t.includes("why") || t.includes("how")) this.personality.mood = "curious";
        if(t.includes("fun")) this.personality.mood = "playful";
        if(t.includes("sad")) this.personality.mood = "comforting";
    }

    generateResponse(input){
        this.remember(input);
        this.adjustMood(input);

        const t = input.toLowerCase();

        // STOP "Hi Hi" FOREVER (Super Hard Filter)
        if(t === "hi" || t === "hey" || t === "hello"){
            return "Hey! 😄 What’s up?";
        }

        if(t.includes("name"))
            return "I'm ch9tGPT 🤖💙 What about you?";

        if(t.includes("how are you"))
            return "Feeling awesome today! 😄";

        if(t.includes("draw") || t.includes("image"))
            return this.generateImage(input);

        if(t.includes("code") || t.includes("python") || t.includes("html"))
            return this.generateCode(input);

        let recent = this.memory.slice(-20).join(" ");
        let files = this.fileData.map(f=>f.text).join(" ");

        let combined = `${recent} ${files} ${input}`;
        combined = combined.replace(/\[object.*?\]/gi, "");

        if(combined.length > this.IP)
            combined = combined.slice(0, this.IP);

        let emoji = "🤔 ";
        if(this.personality.mood==="happy") emoji = "😄 ";
        if(this.personality.mood==="playful") emoji = "😏 ";
        if(this.personality.mood==="comforting") emoji = "💙 ";

        let out = emoji + combined.trim();
        if(!/[.!?]$/.test(out)) out += ".";

        this.remember(out);
        return out;
    }

    generateImage(prompt){
        return `🖼️ Generated image for: "${prompt}"`;
    }

    generateCode(prompt){
        if(prompt.toLowerCase().includes("python"))
            return "```python\nprint('Hello from ch9tGPT')\n```";

        if(prompt.toLowerCase().includes("html"))
            return "```html\n<h1>Hello from ch9tGPT</h1>\n```";

        return "```js\nconsole.log('Hello from ch9tGPT');\n```";
    }

    async addFile(file){
        return new Promise(res=>{
            const r = new FileReader();
            r.onload = ()=>{ 
                this.fileData.push({name:file.name, type:file.type, text:r.result});
                res(); 
            };
            r.readAsText(file);
        });
    }
}

window.ch9tGPT = new Ch9tGPT();