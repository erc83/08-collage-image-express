const express = require('express');
const app = express()
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser')


app.listen(3001, () => {
    console.log('localhost/servidorExpress 3000')
})

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"))


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
    const foto  = req.files.target_file;
    console.log(req.files.target_file)
    const { posicion } = req.body;
    console.log(foto)
    console.log(req.files.target_file.mv)
    foto.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        res.redirect("/collage")
    });
});

app.get("/collage", (req, res )=> {
    res.sendFile(__dirname + "/views/collage.html")
})


// app.delete("/deleteImg/:img", (req, res) => {
//     const img = req.params;
//     console.log(req.params)
//     fs.unlink(`${__dirname}/public/imgs/${img}.jpg`, (err) => {
//         err
//           res.send(`Imagen ${img} fue eliminada con éxito`);
            
//     })
// })










