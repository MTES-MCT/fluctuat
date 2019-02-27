import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { Waybill } from '../models/waybill';
import { verifyJWT } from '../security/verify-jwt.middleware';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';
import {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation
} from '../service/send-waybill.service'
import { fetchWaybill } from './fetch-waybill.middleware';

const randomstring = require('randomstring');
const config = require('../../.data/config.json');
const host = config.host;

const router = Router();

const generateCode = async () => {

  const code = randomstring.generate({
    length: 6,
    readable: true,
    capitalization: 'uppercase'
  });
  // if code exist retry;
  let waybill = await waybillStorage.get(code);
  return waybill ? generateCode() : code;
};

router.post('/', verifyJWT, async (req, res) => {
  let waybill: Waybill = req.body;

  waybill.code = await generateCode();
  waybill.owner = req['user'].email;

  await waybillStorage.put(waybill);

  res.status(201).json(waybill);
});

router.get('/me', verifyJWT, async (req, res) => {
  const userEmail: string = req['user'].email;

  const waybills = await waybillStorage.findByEmail(userEmail);

  res.json(waybills);
});

router.get('/:id', fetchWaybill, (req, res) => {
  res.json(req['waybill']);
});

router.get('/:id/lettre-de-voiture.pdf', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  try {
    const pdf = await generateWaybillPdf(waybill, host);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  if (waybill.loadInfo.sentAt) {
    res.status(400).send('Waybill can not be modified after load' );
    return
  }

  const waybillUpdated: Waybill = req.body;

  waybill.order = waybillUpdated.order;
  waybill.loadInfo = waybillUpdated.loadInfo;
  waybill.unloadInfo = waybillUpdated.unloadInfo;

  await waybillStorage.put(waybill);

  res.status(204).end();
});

router.put('/:id/load-info', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  // if already validated bad request
  if (waybill.loadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le chargement. La modification n'est plus possible.`)
  }

  waybill.loadInfo = req.body;
  waybill.loadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillLoadValidation(waybill, host)
    .then(() => console.log('load validation sent'))
    .catch(console.error);

  res.status(204).end();
});

router.get('/:id/load-info', fetchWaybill, (req, res) => {
  const waybill: Waybill = req['waybill'];

  return res.json(waybill.loadInfo);
});

router.post('/:id/load-info/validate', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  const loadInfo = waybill.loadInfo;

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${waybill.code}/lettre-de-voiture.pdf`;

  if (!loadInfo.validatedAt) {
    loadInfo.validatedAt = new Date();
    await waybillStorage.put(waybill);
  }

  // send waybill loaded email
  sendWaybillLoaded(waybill, host)
    .then(() => console.log('waybill loaded email sent'))
    .catch(console.error);

  res.json(loadInfo);
});

router.get('/:id/unload-info', fetchWaybill, (req, res) => {
  const waybill: Waybill = req['waybill'];

  return res.json(waybill.unloadInfo);
});


router.put('/:id/unload-info', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  // if already validated bad request
  if (waybill.unloadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le déchargement. La modification n'est plus possible.`)
  }

  waybill.unloadInfo = req.body;
  waybill.unloadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillUnloadValidation(waybill, host)
    .then(() => console.log('unload validation sent'))
    .catch(console.error);

  res.status(204).end();
});

router.post('/:id/unload-info/validate', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  const unloadInfo = waybill.unloadInfo;

  if (!unloadInfo.validatedAt) {
    unloadInfo.validatedAt = new Date();
    await waybillStorage.put(waybill);

    // send waybill by email
    sendWaybill(waybill, host)
      .then(() => console.log('waybill sent'))
      .catch(console.error);
  }

  res.json(unloadInfo);
});

module.exports = router;
