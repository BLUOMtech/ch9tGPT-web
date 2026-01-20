function handleFileUpload(event){
    const files = event.target.files;
    const chatbox = document.getElementById("chatbox");

    for(const file of files){
        const reader = new FileReader();
        reader.onload = function(e){
            const div = document.createElement("div");
            div.className="file-preview";

            let textContent="";
            if(file.type.startsWith("image/")){
                div.innerHTML=`<img src="${e.target.result}" alt="${file.name}"/>`;
                textContent="An image file uploaded: "+file.name;
            } else if(file.type.startsWith("video/")){
                div.innerHTML=`<video controls src="${e.target.result}"></video>`;
                textContent="A video file uploaded: "+file.name;
            } else if(file.type==="text/plain"){
                div.innerHTML=`<p>${e.target.result}</p>`;
                textContent=e.target.result;
            } else {
                div.innerHTML=`<p>Uploaded file: ${file.name}</p>`;
                textContent="Other file uploaded: "+file.name;
            }

            bot.learnFromFile({type:file.type, name:file.name, text:textContent});
            chatbox.appendChild(div);
            chatbox.scrollTop=chatbox.scrollHeight;
        };

        if(file.type==="text/plain") reader.readAsText(file);
        else reader.readAsDataURL(file);
    }
}