const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit"); // Importa fontkit

const fontBytes = fs.readFileSync(
  "C:/Users/d.marcano/Desktop/fuentes/SELENA MARIN.ttf"
);

async function annotatePDF(ruta, nombreArchivo, codigoCamanda) {
  console.log(`MARCA DE AGUA: ${ruta}/${nombreArchivo}`);

  // Lee el PDF original
  const pdfBytes = fs.readFileSync(`${ruta}`);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // console.log("pdfDoc", pdfDoc);

  // Registra fontkit
  pdfDoc.registerFontkit(fontkit);

  // Obtiene la primera página
  const page = pdfDoc.getPages()[0];

  // console.log("page",page);

  // Dimensiones de la pagina 
  const { width, height} = page.getSize()

  console.log(width);
  
  let coordenadaX = width - (width * 0.50);
  let coordenadaY = height - (height * 0.95);

  let waterInPdf = `DAKA ONLINE: #${codigoCamanda}`;
  let waterInPdfLon = `DAKA ONLINE: #${codigoCamanda}`.length;
  let logitudRectangulo = waterInPdfLon*10;

  // Crea un rectángulo alrededor de la frase
  page.drawRectangle({
    x: coordenadaX-10, // Coordenada X del vértice superior izquierdo
    y: coordenadaY / 1.5, // Coordenada Y del vértice superior izquierdo
    width: logitudRectangulo, // Ancho del rectángulo
    height: 30, // Altura del rectángulo
    borderWidth: 1, // Grosor del borde (puedes ajustarlo según tus preferencias)
    borderColor: rgb(0.15, 0.15, 0.15), // Color del borde
    color: rgb(1, 1, 1), // Color de fondo (blanco en este caso)
  });

  // Crea una anotación de texto libre
  page.drawText(waterInPdf, {
    x: coordenadaX,
    y: coordenadaY,
    size: 16,
    color: rgb(0.15, 0.15, 0.15),
    font: await pdfDoc.embedFont(fontBytes),
    bold: true,
    italic: true,
  });
  // Guarda el PDF modificado en disco
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(ruta, modifiedPdfBytes);

  console.log("Anotación agregada exitosamente!");
}

module.exports = {
  annotatePDF
};

// let archivo1 = "Hablador-Precio2024-7-9_08-18.pdf";
// // let archivo2 = "archivo_pruebas.pdf";
// let ruta = 'C:/Users/d.marcano/Desktop/waterInPdf/server/src/uploads';

// let codigoCamanda = "4585";

// annotatePDF(ruta ,archivo1, codigoCamanda).catch((error) => {
//   console.error("Error:", error);
// });
