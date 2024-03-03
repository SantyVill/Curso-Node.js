const http = require("node:http");
const fs = require("node:fs");
/* const {findAvailablePort} = require("./free-port.js") */

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8')
    if (req.url === '/') {
        res.statusCode = 200
        res.end('Bienvenido a mi página de inicio.')
    } else if (req.url ==='/contacto') {
        res.statusCode = 200
        res.end('Contacto')
    } else if (req.url==='/imagen.png') {
        fs.readFile('./SegundaPractica/DSC_0016.JPG',(err,data)=>{
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 internal server error: '+err+'</h1>')
            } else {
                res.setHeader('Content-Type','image/jpg')
                res.end(data)
            }
            
        })
    } else {
        res.statusCode = 404
        res.end('<h1>404</h1>.')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
    console.log("Server listening on por localhost:"+desiredPort)
})
