import { Router } from 'express';

import { Waybill } from '../../models/waybill';
import { createWaybill, saveOrderInfo } from '../../service/waybill.service';
import { UserRequest, WaybillRequest } from '../../types';
import { fetchWaybill } from '../fetch-waybill.middleware';
import { verifyApiKey } from './verify-api-key.middleware';

const publicWaybillRoute = Router();

/**
 * @api {get} /waybill/:id Get waybill
 * @apiGroup Waybill
 * @apiName GetWaybill
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id waybill id
 *
 * @apiSuccess {Waybill} waybill the requested waybill
 *
 */
publicWaybillRoute.get('/:id', verifyApiKey, fetchWaybill, (req: WaybillRequest, res) => {
  res.json(req.waybill);
});

/**
 * @api {post} /waybill create new waybill
 * @apiGroup Waybill
 * @apiName CreateWaybill
 * @apiVersion 1.0.0
 */
publicWaybillRoute.post('/', verifyApiKey, async (req: UserRequest, res) => {
  const userEmail = req.user.email;
  const waybill: Waybill = await createWaybill(req.body, userEmail);

  console.log(`${userEmail} creates waybill ${waybill.code}`);

  res.status(201).json(waybill);
});

/**
 * @api {put} /waybill/:id/order-info Modify existing waybill
 * @apiGroup Waybill
 * @apiName UpdateWaybillOrderInfo
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id waybill id
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
