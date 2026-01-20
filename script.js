const inputBox = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");

// FORCE NO-CACHE LOAD CHECK
console.log("Loaded script.js version: 7.0 (NO CACHE)");

function addMessage(sender, text){
    const div = document.createElement("div");
    div.className = sender;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// ALWAYS FORCE RESPONSE
function sendMessage(){
    let text = inputBox.value.trim();

    // if empty, DO NOT stop — force something
    if(!text){
        text = " "; // triggers reply
    }

    addMessage("user", text);

    inputBox.value = "";
    setTimeout(() => { inputBox.value = ""; }, 50);

    let reply;
    try {
        reply = window.ch9tGPT.generateResponse(text);
    } catch (err){
        reply = "⚠️ AI Engine Error: " + err.toString();
    }

    // Final safety: NEVER allow empty bot messages
    if(!reply || reply.trim() === ""){
        reply = "🤖 I’m here! Safari glitch made me quiet, but I’m responding now!";
    }

    addMessage("bot", reply);
}

sendBtn.onclick = sendMessage;

inputBox.addEventListener("keydown", e=>{
    if(e.key === "Enter") sendMessage();
});