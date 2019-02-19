import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { LoadInfo } from '../models/load-info';
import { Waybill } from '../models/waybill';
import { UnloadInfo } from '../models/unload-info';
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
const url = require('url');

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

const getBaseUrl = (req) => {
  return url.format({
    protocol: req.protocol,
    host: req.header('host')
  });
};

router.post('/', verifyJWT, async (req, res) => {
  let waybill: Waybill = req.body;

  waybill.code = await generateCode();
  waybill.owner = req['user'].email;
  waybill.loadInfo = new LoadInfo();
  waybill.unloadInfo = new UnloadInfo();

  await waybillStorage.put(waybill);

  res.status(201).json(waybill);
});

router.get('/me', verifyJWT, async (req, res) => {
  const userEmail: string = req['user'].email;

  const waybills = await waybillStorage.findByEmail(userEmail);

  res.json(waybills);
});

router.get('/:id', fetchWaybill, (req, res) => {

  return res.json(req['waybill']);
});

router.get('/:id/lettre-de-voiture.pdf', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  const baseUrl = getBaseUrl(req);

  try {
    const pdf = await generateWaybillPdf(waybill, baseUrl);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:id/order-info', fetchWaybill, (req, res) => {
  const waybill: Waybill = req['waybill'];

  return res.json(waybill.order);
});

router.put('/:id/order-info', fetchWaybill, (req, res) => {
  const waybill: Waybill = req['waybill'];

  waybill.order = req.body;

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.put('/:id/load-info', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  waybill.loadInfo = req.body;
  waybill.loadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillLoadValidation(waybill, req.headers.origin as string)
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

  if (!loadInfo.validatedAt) {
    loadInfo.validatedAt = new Date();
    await waybillStorage.put(waybill);
  }

  // send waybill loaded email
  sendWaybillLoaded(waybill, req.headers.origin as string)
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

  waybill.unloadInfo = req.body;
  waybill.unloadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillUnloadValidation(waybill, req.headers.origin as string)
    .then(() => console.log('unload validation sent'))
    .catch(console.error);

  res.status(204).end();
});

router.post('/:id/unload-info/validate', fetchWaybill, async (req, res) => {
  const waybill: Waybill = req['waybill'];

  const unloadInfo = waybill.unloadInfo;

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${waybill.code}/lettre-de-voiture.pdf`;

  if (!unloadInfo.validatedAt) {
    unloadInfo.validatedAt = new Date();
    await waybillStorage.put(waybill);

    // send waybill by email
    sendWaybill(waybill, getBaseUrl(req))
      .then(() => console.log('waybill sent'))
      .catch(console.error);
  }

  res.json(unloadInfo);
});

module.exports = router;
