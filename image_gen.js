function generateImage(prompt, width=256, height=256){
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Simple gradient + pattern using prompt hash
    let hash = 0;
    for(let i=0;i<prompt.length;i++) hash += prompt.charCodeAt(i);

    // Background gradient
    const grad = ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0, `hsl(${hash%360}, 50%, 60%)`);
    grad.addColorStop(1, `hsl(${(hash+180)%360}, 50%, 60%)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);

    // Draw “objects” based on hash
    for(let i=0;i<15;i++){
        const x = Math.floor(Math.random()*width);
        const y = Math.floor(Math.random()*height);
        const size = Math.floor(Math.random()*30)+5;
        ctx.fillStyle = `hsl(${(hash+i*20)%360}, 70%, 50%)`;
        ctx.beginPath();
        ctx.arc(x,y,size,0,Math.PI*2);
        ctx.fill();
    }

    return canvas.toDataURL();
}