const router = require('express').Router();

let transporter;
let delivery;

router.post('/', (req, res) => {
  transporter = req.body.transporter;
  delivery = req.body.delivery;

  console.log('contract data settled');
  return res.status(201).location('/api/contract').end();
});

router.get('/', (req, res) => {
  generatePdf().then(result => {
    console.log('get contract');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(result);
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
  })
});


// Based on https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e

const pdfMakePrinter = require('pdfmake/src/printer');
const {getContent} = require('../confirmation-trasport');
const generatePdf = () => {
  const docDefinition = getContent(transporter, delivery);
  const fonts = {
    Roboto: {
      normal: './fonts/Roboto-Regular.ttf'
    }
  };
  return new Promise((success, reject) => {
    try {

      const printer = new pdfMakePrinter(fonts);
      const doc = printer.createPdfKitDocument(docDefinition);

      let chunks = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      doc.on('end', () => {
        success(Buffer.concat(chunks));
      });

      doc.end();

    } catch (err) {
      reject(err)
    }
  })
};

module.exports = router;
