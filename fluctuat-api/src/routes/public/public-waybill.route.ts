import { Router } from 'express';

import { Waybill } from '../../models/waybill';
import { createWaybill, saveOrderInfo } from '../../service/waybill.service';
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
publicWaybillRoute.get('/:id', verifyApiKey, fetchWaybill, (req: any, res) => {

  // User can get only their own waybills
  if (req.waybill.owner !== req.owner) {
    res.status(404).send(`La lettre de voiture "${req.waybill.code}" n'existe pas.`);
  }

  res.json(req.waybill);
});

/**
 * @api {post} /waybill create new waybill
 * @apiGroup Waybill
 * @apiName CreateWaybill
 * @apiVersion 1.0.0
 */
publicWaybillRoute.post('/', verifyApiKey, async (req: any, res) => {
  const userEmail = req.owner;
  let waybill: Waybill = req.body;

  waybill = await createWaybill(waybill.order, userEmail);

  console.log(`${userEmail} creates waybill ${waybill.code} by api`);

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
publicWaybillRoute.put('/:id/order-info', verifyApiKey, fetchWaybill, async (req: any, res) => {
  const waybill: Waybill = req.waybill;

  // User can update only their own waybills
  if (waybill.owner !== req.owner) {
    res.status(404).send(`La lettre de voiture "${waybill.code}" n'existe pas.`);
  }

  if (waybill.loadInfo.sentAt) {
    res.status(400).send(`Le chargement a démarré. La modification n'est plus possible`);
    return;
  }

  await saveOrderInfo(waybill, req.body);

  res.status(204).end();
});

export { publicWaybillRoute };
