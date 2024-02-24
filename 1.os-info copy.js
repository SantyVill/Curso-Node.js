import { platform, release, arch, cpus, freemem, totalmem, uptime } from "node:os";

console.log("Informacion del sistema operatico.");
console.log("----------------------------------");
console.log("Nombre del sistema operativo: "+platform());
console.log("Version del sistema Operativo: "+release());
console.log("Arquitectura: "+arch());
console.log("CPUs: "+cpus());
console.log("Memoria Libre: "+freemem()/1024/1024);
console.log("Memoria Total: "+totalmem()/1024/1024);
console.log("Uptime: "+uptime()/60/60);