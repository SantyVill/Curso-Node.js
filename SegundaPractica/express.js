const express=require("express")
const app = express();
const port = process.env.PORT ?? 1234
app.disable("x-powered-by")

app.use((req,res,next)=>{
    if (req.method!=='POST') return next()
    if (req.headers['content-type']!=='application/json') return next()

    //Solo llegan las request que son Post y tienen el header content type application json
    let body = '';

    req.on('data',chunk=>{
        body+=chunk.toString()
    })

    req.on("end",()=>{
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        req.body = data
        next()
    })
})

app.get('/',(req,res)=>{
    res.status(200).send('<h1>Mi Página</h1>')
})

app.post('/pokemon',(req,res)=>{
    /* let body = '';

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const data = JSON.parse(body);

        data.timestamp = Date.now(); */
        res.status(201).json(res.body);
    /* }); */
})

app.use((req,res)=>{
    res.status(404).send("<h1>404</h1>")
})

app.listen(port, ()=>{
    console.log("listening in port: "+port)
})