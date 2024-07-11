const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const { uploadFile } = require("../src/controllers/multer.controller");
const { annotatePDF } = require("./controllers/water.cotroller");

const cors = require("cors");
const { log } = require("console");
app.use(cors());

// Asigna la función uploadFile al manejador de rutas
app.post("/upload", uploadFile, (req, res) => {
  res.send("Archivo subido correctamente");
});

app.get("/download/:archivo", async (req, res) => {
  let { archivo } = req.params;
  let nombreArchivo = archivo.substring(0, 10);
  // COLOCAR MARCA DE AGUA 
  let ruta = path.join(__dirname, `/uploads/${archivo}`);
  log(ruta)
  await annotatePDF(ruta, "nombre-del-archivo", "04124838327");
  res.download(ruta, `Archivo modificado: ${nombreArchivo}.pdf`, (error) => {
    if(error) {
      console.error("Download error: " + error.message);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
