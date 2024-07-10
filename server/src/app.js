const express = require("express");
const app = express();
const port = 3000;

const { uploadFile } = require("../src/controllers/multer.controller");

const cors = require("cors");
app.use(cors());

// Asigna la función uploadFile al manejador de rutas
app.post("/upload", uploadFile, (req, res) => {
  res.send("Archivo subido correctamente");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
