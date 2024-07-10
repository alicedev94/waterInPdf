const PDFDocument = require("pdfkit");
const doc = new PDFDocument();

const seal = async (res) => {
   doc
    .fillColor("#FF0000") // Establece el color de relleno en rojo
    .fillOpacity(0.5) // Establece la opacidad del relleno (0.5 = 50%)
    .text("S", {
      width: 465,
      continued: true,
    });

    doc.pipe(res);

    doc.end();
};

module.exports = { seal };
