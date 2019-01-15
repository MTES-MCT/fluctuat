import { Router } from 'express';

import * as contractStorage from '../storage/contract-storage';

const router = Router();
router.post('/', (req, res) => {
  let contract = req.body;

  contract.id = contractStorage.count();
  contract.status = 'CREATED';
  contract.documentUrl = `/api/contract/${contract.id}/confirmation-transport.pdf`;
  contract.createdAt = new Date();

  console.log(`contract ${contract.id} data settled`);
  contractStorage.put(contract);

  return res.status(201).location(`/api/contract/${contract.id}`).json(contract);
});

router.get('/', (req, res) => {
  return res.json(contractStorage.getAll());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  res.json(contractStorage.get(id));
});

router.get('/:id/confirmation-transport.pdf', (req, res) => {
  const id = req.params.id;
  generatePdf(contractStorage.get(id)).then(result => {

    res.setHeader('Content-Type', 'application/pdf');
    res.send(result);
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
  })
});

router.post('/:id/accept', (req, res) => {
  const id = req.params.id;

  contractStorage.patch(id, {
    status: 'ACCEPTED',
    acceptedAt: new Date()
  });

  res.status(200).json(contractStorage.get(id));
});

router.post('/:id/load', (req, res) => {
  const id = req.params.id;

  contractStorage.patch(id, {
    status: 'LOADED',
    loadedAt: new Date(),
    ship: req.body.ship,
    loadInfo: req.body.loadInfo
  });

  res.status(200).json(contractStorage.get(id));
});

router.post('/:id/confirm', (req, res) => {
  const id = req.params.id;

  contractStorage.patch(id, {
    status: 'CONFIRMED',
    confirmedAt: new Date()
  });

  res.status(200).json(contractStorage.get(id));
});

router.post('/:id/unload', (req, res) => {
  const id = req.params.id;

  contractStorage.patch(id, {
    status: 'UNLOADED',
    unloadedAt: new Date(),
    unloadInfo: req.body.unloadInfo
  });

  res.status(200).json(contractStorage.get(id));
});

router.post('/:id/received', (req, res) => {
  const id = req.params.id;

  contractStorage.patch(id, {
    status: 'RECEIVED',
    receivedAt: new Date()
  });

  res.status(200).json(contractStorage.get(id));
});

// Based on https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e

const pdfMakePrinter = require('pdfmake/src/printer');
const {transportConfirmation} = require('../confirmation-trasport');
const generatePdf = (contract) => {
  const docDefinition = transportConfirmation(contract);
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
