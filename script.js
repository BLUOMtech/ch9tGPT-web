const inputBox = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");

function addMessage(sender, text){
    const div = document.createElement("div");
    div.className = sender;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// FIX: Always respond even if same message is spammed
function sendMessage(){
    const text = inputBox.value.trim();

    // block empty sends
    if(!text) return;

    addMessage("user", text);

    // force refresh input so Safari triggers event
    inputBox.value = "";
    setTimeout(()=>inputBox.value="", 10);

    const reply = window.ch9tGPT.generateResponse(text);

    addMessage("bot", reply);
}

sendBtn.onclick = sendMessage;

// FIX: enter works even when input hasn't changed
inputBox.addEventListener("keydown", e=>{
    if(e.key === "Enter") sendMessage();
});