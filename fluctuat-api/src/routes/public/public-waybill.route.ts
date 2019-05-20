import { Router } from 'express';

import { Waybill } from '../../models/waybill';
import { createWaybill, saveOrderInfo } from '../../service/waybill.service';
import { UserRequest, WaybillRequest } from '../../types';
import { fetchWaybill } from '../fetch-waybill.middleware';
import { verifyApiKey } from './verify-api-key.middleware';

const publicWaybillRoute = Router();

/**
 *
 */
publicWaybillRoute.get('/:id', verifyApiKey, fetchWaybill, (req: WaybillRequest, res) => {
  res.json(req.waybill);
});

/**
 *
 */
publicWaybillRoute.post('/', verifyApiKey, async (req: UserRequest, res) => {
  const userEmail = req.user.email;
  const waybill: Waybill = await createWaybill(req.body, userEmail);

  console.log(`${userEmail} creates waybill ${waybill.code}`);

  res.status(201).json(waybill);
});

/**
 *
 */
publicWaybillRoute.put('/:id/order-info', verifyApiKey, fetchWaybill, async (req: WaybillRequest, res) => {
  const waybill: Waybill = req.waybill;

  if (waybill.loadInfo.sentAt) {
    res.status(400).send(`Le chargement a démarré. La modification n'est plus possible`);
    return;
  }

  await saveOrderInfo(waybill, req.body);

  res.status(204).end();
});

export { publicWaybillRoute };
