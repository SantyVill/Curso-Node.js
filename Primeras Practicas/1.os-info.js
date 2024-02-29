const os = require("node:os")

console.log("Informacion del sistema operatico.");
console.log("----------------------------------");
console.log("Nombre del sistema operativo: "+os.platform());
console.log("Version del sistema Operativo: "+os.release());
console.log("Arquitectura: "+os.arch());
console.log("CPUs: "+os.cpus());
console.log("Memoria Libre: "+os.freemem()/1024/1024);
console.log("Memoria Total: "+os.totalmem()/1024/1024);
console.log("Uptime: "+os.uptime()/60/60);