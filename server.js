const express = require('express');
const app = express()
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const fs = require("fs")

app.listen(3000, () => {
    console.log('localhost/servidorExpress 3000')
})

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


 //middleware de fileupload
app.use( 
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/formulario.html")
})

// crear ruta para la devolucion del formulario
app.post("/imagen", (req, res) => {
    const { target_file }  = req.files;   //target_file es el nombre que viene del formulario
    const { posicion } = req.body;         //position es el numero que viene del formulario
    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        res.redirect("/collage")
    });
});

app.get("/collage", (req, res )=> {
    res.sendFile(__dirname + "/views/collage.html")
})

// falta realizar el delete de este collage
app.get("/deleteImg/:nombre", (req, res) => {
    const { nombre } = req.params;
    console.log(req.params)
    fs.unlink(`${__dirname}/public/imgs/${nombre}.jpg`, (err) => {
          res.send(`${nombre} fue eliminada con éxito, <a href="/"><button>Subir otra imagen</button></a> o <a href="/collage"><button>Volver a Galeria</button></a>`);
    });
})












