const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Exporta la función de devolución de llamada para usarla en app.js
const uploadFile = multer({ storage }).single("filePdf");

module.exports = { uploadFile };
