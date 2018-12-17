const router = require('express').Router();

let contracts = [];

router.post('/', (req, res) => {
  let contract = req.body;
  contract.id = contracts.length;
  contracts.push(contract);

  contract.status = 'CREATED';
  contract.documentUrl = `/api/contract/${contract.id}/confirmation-transport.pdf`;
  contract.createdAt = new Date();

  console.log(`contract ${contract.id} data settled`);

  return res.status(201).location(`/api/contract/${contract.id}`).json(contract);
});

router.get('/', (req, res) => {
  return res.json(contracts);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`get contract ${id} pdf`);

  res.json(contracts[id]);
});

router.get('/:id/confirmation-transport.pdf', (req, res) => {
  const id = req.params.id;
  console.log(`get contract ${id} pdf`);
  generatePdf(contracts[id]).then(result => {

    res.setHeader('Content-Type', 'application/pdf');
    res.send(result);
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
  })
});

router.post('/:id/accept', (req, res) => {
  const id = req.params.id;

  contracts[id].status = 'ACCEPTED';
  contracts[id].acceptedAt = new Date();

  return res.status(204).end()
});

// Based on https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e

const pdfMakePrinter = require('pdfmake/src/printer');
const {getContent} = require('../confirmation-trasport');
const generatePdf = (contract) => {
  const docDefinition = getContent(contract.transporter, contract.delivery);
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
