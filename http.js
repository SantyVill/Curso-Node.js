const http = require("node:http")
const {findAvailablePort} = require("./free-port.js")

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req,res)=>{
    console.log("Request received")
    res.end("Hola mudno");
})

findAvailablePort(desiredPort).then(port=>{
    server.listen(port, ()=>{
        console.log("Server listening on por localhost:"+port)
    })
})
