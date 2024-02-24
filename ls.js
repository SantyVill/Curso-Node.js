const fs = require("node:fs");

fs.readdir('.',(err,files)=>{
    if (err) {
        console.error("se produjo un error: ",err);
        return;
    }

    files.forEach(file =>{
        console.log(file)
    })
})