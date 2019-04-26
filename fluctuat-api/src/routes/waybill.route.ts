import { Router } from 'express';
import * as randomstring from 'randomstring';
import { Waybill } from '../models/waybill';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';
import { UserRequest, verifyJWT } from '../security/verify-jwt.middleware';
import { sendLoadValidation, sendUnLoadValidation } from '../service/waybill-validation.service';
import * as waybillStorage from '../storage/waybill-storage';
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const waybillRoute = Router();

const generateCode = async () => {

  const code = randomstring.generate({
    length: 6,
    readable: true,
    capitalization: 'uppercase'
  });
  // if code exist retry;
  const waybill = await waybillStorage.get(code);
  return waybill ? generateCode() : code;
};

waybillRoute.post('/', verifyJWT, async (req: UserRequest, res) => {
  const waybill: Waybill = req.body;

  waybill.code = await generateCode();
  waybill.owner = req.user.email;

  await waybillStorage.put(waybill);

  console.log(`${req.user.email} creates waybill ${waybill.code}`);

  res.status(201).json(waybill);
});

waybillRoute.get('/', verifyJWT, async (req: UserRequest, res) => {
  if (!req.user.admin) {
    return res.status(403).send('Not allowed');
  }

  const waybills = await waybillStorage.getAll();

  console.log(`admin ${req.user.email} get all waybills`);

  res.json(waybills);
});

waybillRoute.get('/me', verifyJWT, async (req: UserRequest, res) => {
  const userEmail: string = req.user.email;

  const waybills = await waybillStorage.findByEmail(userEmail);

  console.log(`${req.user.email} get waybills`);

  res.json(waybills);
});

waybillRoute.get('/:id', fetchWaybill, (req: WaybillRequest, res) => {
  res.json(req.waybill);
});

waybillRoute.get('/:id/lettre-de-voiture.pdf', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  try {
    const pdf = await generateWaybillPdf(waybill);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.sendStatus(500);
  }
});

waybillRoute.put('/:id/order-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  if (waybill.loadInfo.sentAt) {
    res.status(400).send(`Le chargement a démarré. La modification n'est plus possible`);
    return;
  }

  waybill.order = req.body;
  // TODO add sent date

  await waybillStorage.put(waybill);

  res.status(204).end();
});

waybillRoute.put('/:id/load-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  // if already validated bad request
  if (waybill.loadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le chargement. La modification n'est plus possible.`);
  }

  waybill.loadInfo = req.body;
  waybill.loadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  await sendLoadValidation(waybill);

  res.status(204).end();
});

waybillRoute.get('/:id/load-info', fetchWaybill, (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  return res.json(waybill.loadInfo);
});

waybillRoute.get('/:id/unload-info', fetchWaybill, (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  return res.json(waybill.unloadInfo);
});

waybillRoute.put('/:id/unload-info', fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  // if already validated bad request
  if (waybill.unloadInfo.validatedAt) {
    return res.status(400)
      .send(`Le transporteur a confirmé le déchargement. La modification n'est plus possible.`);
  }

  // if loadInfo is not validated bad request
  if (!waybill.loadInfo.validatedAt) {
    return res.status(400)
      .send(`Le déchargement ne peux pas commencer avant la confirmation du chargement.`);
  }

  waybill.unloadInfo = req.body;
  waybill.unloadInfo.sentAt = new Date();

  await waybillStorage.put(waybill);

  await sendUnLoadValidation(waybill);

  res.status(204).end();
});

export { waybillRoute };
