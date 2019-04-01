import { Router } from 'express';
import { Waybill } from '../models/waybill';
import { WaybillNotify } from '../models/waybill.notify';
import { sendWaybillNotification } from '../service/send-waybill.service';
import { get } from '../storage/waybill-storage';

const router = Router();

router.post('/waybill', async (req, res) => {
  const notifyData: WaybillNotify = req.body;

  const waybill: Waybill = await get(notifyData.waybillId.toUpperCase()); // case insensitive

  if (!waybill) {
    return res.status(404).send(`La lettre de voiture "${notifyData.waybillId}" n'existe pas.`);
  }

  try {
    await sendWaybillNotification(notifyData, waybill);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
