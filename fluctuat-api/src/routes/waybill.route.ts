import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { Waybill } from '../models/waybill';
import { UserRequest, verifyJWT } from '../security/verify-jwt.middleware';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';
import {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation
} from '../service/send-waybill.service'
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const randomstring = require('randomstring');

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

router.post('/', verifyJWT, async (req: UserRequest, res) => {
  let waybill: Waybill = req.body;

  waybill.code = await generateCode();
  waybill.owner = req.user.email;

  await waybillStorage.put(waybill);

  console.log(`${req.user.email} creates waybill ${waybill.code}`);

  res.status(201).json(waybill);
});


router.get('/', verifyJWT, async (req: UserRequest, res) => {
  if (!req.user.admin) {
    return res.status(403).send('Not allowed');
  }

  const waybills = await waybillStorage.getAll();

  console.log(`admin ${req.user.email} get all waybills`);

  res.json(waybills);
});

router.get('/me', verifyJWT, async (req: UserRequest, res) => {
  const userEmail: string = req.user.email;

  const waybills = await waybillStorage.findByEmail(userEmail);

  console.log(`${req.user.email} get waybills`);

  res.json(waybills);
});

router.get('/:id', fetchWaybill, (req: WaybillRequest, res) => {
  res.json(req.waybill);
});

router.get('/:id/lettre-de-voiture.pdf', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  try {
    const pdf = await generateWaybillPdf(waybill);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id/order-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  if (waybill.loadInfo.sentAt) {
    res.status(400).send(`Le chargement a démarré. La modification n'est plus possible`);
    return
  }

  waybill.order = req.body;
  // TODO add sent date

  await waybillStorage.put(waybill);

  res.status(204).end();
});

router.put('/:id/load-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  // if already validated bad request
  if (waybill.loadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le chargement. La modification n'est plus possible.`)
  }

  waybill.loadInfo = req.body;
  waybill.loadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillLoadValidation(waybill)
    .then(() => console.log('load validation sent'))
    .catch(console.error);

  res.status(204).end();
});

router.get('/:id/load-info', fetchWaybill, (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  return res.json(waybill.loadInfo);
});

router.post('/:id/load-info/validate', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  const loadInfo = waybill.loadInfo;

  // if not loadInfo sent return bad request
  if (!loadInfo.sentAt) {
    return res.status(400).send(`Le chargement n'a pas été encore commencé`)
  }

  // if already validated return loadInfo
  if (loadInfo.validatedAt) {
    return res.json(loadInfo)
  }

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${waybill.code}/lettre-de-voiture.pdf`;
  loadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  // send waybill loaded email
  sendWaybillLoaded(waybill)
    .then(() => console.log('waybill loaded email sent'))
    .catch(console.error);

  res.json(loadInfo);
});

router.get('/:id/unload-info', fetchWaybill, (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  return res.json(waybill.unloadInfo);
});

router.put('/:id/unload-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  // if already validated bad request
  if (waybill.unloadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le déchargement. La modification n'est plus possible.`)
  }

  // if loadInfo is not validated bad request
  if (!waybill.loadInfo.validatedAt) {
    return res.status(400)
      .send(`Le déchargement ne peux pas commencar avant la confirmation du chargement.`)
  }

  waybill.unloadInfo = req.body;
  waybill.unloadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  // send validation email
  sendWaybillUnloadValidation(waybill)
    .then(() => console.log('unload validation sent'))
    .catch(console.error);

  res.status(204).end();
});

router.post('/:id/unload-info/validate', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = waybill.unloadInfo;

  // if not loadInfo sent return bad request
  if (!unloadInfo.sentAt) {
    return res.status(400).send(`Le déchargement n'a pas été encore commencé`)
  }

  //if already validated return unloadInfo
  if (unloadInfo.validatedAt) {
    return res.json(unloadInfo);
  }

  unloadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  // send waybill by email
  sendWaybill(waybill)
    .then(() => console.log('waybill sent'))
    .catch(console.error);

  res.json(unloadInfo);
});

module.exports = router;
