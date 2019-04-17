// Based on https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e
import * as PdfMakePrinter from 'pdfmake/src/printer';

const fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Bold.ttf'
  }
};

const printer = new PdfMakePrinter(fonts);

export function generatePdf(docDefinition) {
  return new Promise((success, reject) => {
    try {
      const doc = printer.createPdfKitDocument(docDefinition);

      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));

      doc.on('end', () => success(Buffer.concat(chunks)));

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}
