class Ch9tGPT {
    constructor() {
        this.memory = []; 
        this.fileData = []; 
        this.personality = { mood: "curious", friendliness: 0.8, humor: 0.4 };
        this.IP = 300; 
    }

    remember(message) {
        if(typeof message==="string" && message.trim()!=="") {
            this.memory.push(message);
            this.saveMemory();
        }
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
        if(Math.random()<0.2) this.personality.mood="playful";
    }

    generateResponse(input) {
        this.remember(input);
        const text = input.toLowerCase();
        let response = "";

        // Keyword-based natural replies first
        if(text.includes("name")) response = "I’m ch9tGPT 🤖. What about you?";
        else if(text.includes("hi") || text.includes("hello")) response = "Hey! How’s it going?";
        else if(text.includes("how are you")) response = "I’m doing great 😄 How about you?";
        else if(text.includes("draw") || text.includes("image")) response = generateImage(input);
        else if(text.includes("code") || text.includes("program")) response = generateCode(input);
        else {
            // fallback: IP300 phrase-based context reasoning
            const recent = this.memory.slice(-50).join(" ");
            const files = this.fileData.map(f=>f.text).filter(t=>t).join(" ");
            const context = recent + " " + files + " " + input;

            const phrases = context.match(/.{1,50}/g)||[];
            const relevance = phrases.map((p,i)=>{
                let score = 1 + (i/phrases.length);
                if(p.toLowerCase().includes(input.toLowerCase())) score += 2;
                return {phrase:p, score};
            });

            relevance.sort((a,b)=>b.score-a.score);

            response = "";
            for(let r of relevance){
                if(response.length + r.phrase.length > this.IP) break;
                response += r.phrase + " ";
            }

            if(this.personality.mood==="happy") response="😄 "+response;
            else if(this.personality.mood==="curious") response="🤔 "+response;
            else if(this.personality.mood==="playful") response="😏 "+response;
            else if(this.personality.mood==="comforting") response="💙 "+response;

            response = response.trim();
            if(!/[.!?]$/.test(response)) response+=".";
        }

        this.remember(response);
        return response;
    }
}

const bot = new Ch9tGPT();
bot.loadMemory();