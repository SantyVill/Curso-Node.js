const path = require("node:path");

console.log(path.sep);

const filePath = path.join("content","folder","file.txt");

console.log(filePath);

const fileName = path.basename(filePath);

console.log(fileName);

const fileExtend = path.extname(filePath)

console.log(fileExtend)