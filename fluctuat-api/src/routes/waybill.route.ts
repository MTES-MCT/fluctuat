import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { LoadInfo } from '../models/load-info';
import { Waybill } from '../models/waybill';
import { UnloadInfo } from '../models/unload-info';
import { verifyJWT } from '../security/verify-jwt.middleware';
import { generatePdf } from '../pdf/generate-pdf';
import { getDocDefinition } from '../pdf/waybill-pdf';
import { sendWaybill} from '../service/send-waybill'

const randomstring = require('randomstring');

const router = Router();

const generateId = () => {

  const id = randomstring.generate({
    length: 6,
    readable: true,
    capitalization: 'uppercase'
  });
  // if id exist retry;
  return waybillStorage.get(id) ? generateId() : id;
};

router.post('/', verifyJWT, (req, res) => {
  let waybill: Waybill = req.body;

  waybill.id = generateId();
  waybill.owner = req['user'].email;
  waybill.loadInfo = new LoadInfo();
  waybill.unloadInfo = new UnloadInfo();

  waybillStorage.put(waybill);

  res.status(201).json(waybill);
});

router.get('/me', verifyJWT, (req, res) => {
  const userEmail: string = req['user'].email;
  console.log(userEmail);

  const waybills: Waybill[] = waybillStorage.findByEmail(userEmail);

  res.json(waybills);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill);
});

router.get('/:id/lettre-de-voiture.pdf', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  generatePdf(getDocDefinition(waybill))
    .then(pdf => {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdf);
    }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
});

router.get('/:id/order-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.order);
});

router.put('/:id/order-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.order = req.body;

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.put('/:id/load-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.loadInfo = req.body;
  waybill.loadInfo.sentAt = new Date();

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.get('/:id/load-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.loadInfo);
});

router.post('/:id/load-info/validate', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  const loadInfo = waybill.loadInfo;

  if (!loadInfo.validatedAt) {
    loadInfo.validatedAt = new Date();
    waybillStorage.put(waybill);
  }

  res.json(loadInfo);
});

router.get('/:id/unload-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.unloadInfo);
});


router.put('/:id/unload-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.unloadInfo = req.body;
  waybill.unloadInfo.sentAt = new Date();

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.post('/:id/unload-info/validate', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  const unloadInfo = waybill.unloadInfo;

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${id}/lettre-de-voiture.pdf`;

  if (!unloadInfo.validatedAt) {
    unloadInfo.validatedAt = new Date();
    waybillStorage.put(waybill);
  }

  // send waybill by email
  sendWaybill(waybill)
    .then(() => console.log('waybill sent'))
    .catch(console.error);

  res.json(unloadInfo);
});

module.exports = router;
