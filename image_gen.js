function generateImage(prompt, width=256, height=256){
    const canvas=document.createElement("canvas");
    canvas.width=width; canvas.height=height;
    const ctx=canvas.getContext("2d");

    let hash=0; for(let i=0;i<prompt.length;i++) hash+=prompt.charCodeAt(i);

    const grad=ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0,`hsl(${hash%360},50%,60%)`);
    grad.addColorStop(1,`hsl(${(hash+180)%360},50%,60%)`);
    ctx.fillStyle=grad; ctx.fillRect(0,0,width,height);

    for(let i=0;i<15;i++){
        const x=Math.random()*width;
        const y=Math.random()*height;
        const size=Math.random()*30+5;
        ctx.fillStyle=`hsl(${(hash+i*20)%360},70%,50%)`;
        ctx.beginPath();
        ctx.arc(x,y,size,0,Math.PI*2);
        ctx.fill();
    }

    return canvas.toDataURL();
}