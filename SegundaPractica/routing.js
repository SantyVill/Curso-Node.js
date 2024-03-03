const http = require('node:http');
const dittoJson = require("./Pokemon/ditto");

const processreq = (req, res) => {
    const { method, url } = req;

    // Establece los encabezados una vez, independientemente del método HTTP
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    switch (method) {
        case "GET":
            switch (url) {
                case "/pokemon/ditto":
                    return res.end(JSON.stringify(dittoJson));
                case "/abaut":
                    break;
                default:
                    res.statusCode = 404;
                    res.end('<h1>404</h1>.');
                    break;
            }
            break;
        case "POST":
            switch (url) {
                case "/pokemon":
                    let body = '';

                    req.on("data", chunk => {
                        body += chunk.toString();
                    });

                    req.on("end", () => {
                        const data = JSON.parse(body);

                        // Envía la respuesta después de haber parseado el cuerpo del POST
                        res.end(JSON.stringify(data));
                    });
                    break;
                default:
                    break;
            }
            break;
        default:
            res.statusCode = 404;
            res.end('404 Not Found');
            break;
    }
}

const server = http.createServer(processreq);

server.listen(1234, () => {
    console.log('server listening on port: http://localhost:1234');
});