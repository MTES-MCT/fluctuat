import { Router } from 'express';

import { Waybill } from '../../models/waybill';
import { createWaybill, saveOrderInfo } from '../../service/waybill.service';
import { fetchWaybill } from '../fetch-waybill.middleware';
import { verifyApiKey } from './verify-api-key.middleware';

const publicWaybillRoute = Router();

/**
 * @api {get} /waybill/:id  Consulter une lettre de voiture
 * @apiVersion 1.0.0
 * @apiName GetWaybill
 * @apiGroup Waybill
 *
 * @apiDescription Permet de recuperer une lettre de voiture existante. <br/>
 * L'utilisateur peut seulement consulter les lettres de voiture crées avec sa clé.
 *
 * @apiParam {String} id Le code de la lettre de voiture
 *
 * @apiSuccess {String} code Le code de la lettre de voiture
 * @apiSuccess {String} owner L'email de le proprietaire de la lettre de voiture
 * @apiSuccess {OrderInfo} order Les informations préalables de la lettre de voiture.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "LVDEMO",
 *       "owner": "email@example.com",
 *       "orderInfo: {
 *            "customer": {},
 *            "sender": {},
 *            "receiver": {},
 *            "middleman": {
 *            "isBroker": true
 *         },
 *         "transporter": {},
 *         "ship": {},
 *         "originInfo": {
 *         },
 *         "destinationInfo": {
 *         },
 *         "merchandise": {
 *         },
 *        "sentAt": "2019-05-27T15:15:00.491Z"
 *       }
 *     }
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
 * @api {post} /waybill Créer une lettre de voiture
 * @apiVersion 1.0.0
 * @apiName CreateWaybill
 * @apiGroup Waybill
 *
 * @apiSuccess (Created 201) {String} code Le code de la lettre de voiture
 * @apiSuccess (Created 201) {String} owner L'email de le proprietaire de la lettre de voiture
 * @apiSuccess (Created 201) {OrderInfo} order Les informations préalables de la lettre de voiture.
 *
 */
publicWaybillRoute.post('/', verifyApiKey, async (req: any, res) => {
  const userEmail = req.owner;
  let waybill: Waybill = req.body;

  waybill = await createWaybill(waybill.orderInfo, userEmail);

  console.log(`${userEmail} creates waybill ${waybill.code} by api`);

  res.status(201).json(waybill);
});

/**
 * @api {put} /waybill/:id/order-info Modifier les informations d'une lettre de voiture existante.
 * @apiVersion 1.0.0
 * @apiName UpdateWaybillOrderInfo
 * @apiGroup Waybill
 *
 * @apiParam {String} id Le code de la lettre de voiture
 * @apiParam {OrderInfo} order informations préalables de la lettre de voiture
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
