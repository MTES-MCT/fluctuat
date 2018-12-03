const express = require('express');
const bodyParser = require('body-parser');


const app = module.exports = express();

app.use('/', express.static(__dirname));
app.use(bodyParser.json());

let transporter;
let delivery;

app.post('/api/contract', (req, res) => {
  transporter = req.body.transporter;
  delivery = req.body.delivery;

  console.log('contract date settled');
  return res.status(201).end();
});

app.get('/api/contract', (req, res) => {
  generatePdf().then(result => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(result);
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
  })
});

// Based on https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e

const pdfMakePrinter = require('pdfmake/src/printer');
const {getContent} = require('./confirmation-trasport');
const generatePdf = () => {
  const docDefinition = getContent(transporter, delivery)
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

/** Start server **/
const port = process.argv[ 2 ] || 9000;

app.listen(port, function () {
  console.log('Express server listening in http://localhost:%d', port);
});
