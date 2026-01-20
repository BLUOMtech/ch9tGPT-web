function generateCode(prompt){
    prompt = prompt.toLowerCase();
    let code = "";

    if(prompt.includes("html")){
        code = `<html>\n  <head>\n    <title>${prompt}</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`;
    } else if(prompt.includes("python")){
        code = `def hello():\n    print("Hello World")\n\nhello()`;
    } else if(prompt.includes("javascript")){
        code = `function hello(){\n    console.log("Hello World");\n}\nhello();`;
    } else {
        code = "// Sorry, I don't know that language. Try HTML, Python, or JavaScript.";
    }

    return code;
}