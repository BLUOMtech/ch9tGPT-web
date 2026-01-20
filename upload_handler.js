function handleFileUpload(event){
    const files = event.target.files;
    const chatbox = document.getElementById("chatbox");

    for(const file of files){
        const reader = new FileReader();
        reader.onload = function(e){
            const content = e.target.result;
            const div = document.createElement("div");
            div.className="file-preview";

            if(file.type.startsWith("image/")){
                div.innerHTML=`<img src="${content}" alt="${file.name}"/>`;
                bot.learnFromFile({type:"image", name:file.name, text:"An image uploaded"});
            } else if(file.type.startsWith("video/")){
                div.innerHTML=`<video controls src="${content}"></video>`;
                bot.learnFromFile({type:"video", name:file.name, text:"A video uploaded"});
            } else if(file.type==="text/plain"){
                div.innerHTML=`<p>${content}</p>`;
                bot.learnFromFile({type:"text", name:file.name, text:content});
            } else{
                div.innerHTML=`<p>File uploaded: ${file.name}</p>`;
                bot.learnFromFile({type:"other", name:file.name, text:"Other file"});
            }

            chatbox.appendChild(div);
            chatbox.scrollTop = chatbox.scrollHeight;
        };
        if(file.type === "text/plain") reader.readAsText(file);
        else reader.readAsDataURL(file);
    }
}