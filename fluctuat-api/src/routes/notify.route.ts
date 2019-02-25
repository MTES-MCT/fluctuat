import { Router } from 'express';
import { WaybillNotify } from '../models/waybill.notify';
import { sendWaybillNotification } from '../service/send-waybill.service';

const router = Router();

const config = require('../../.data/config.json');
const host = config.host;

router.post('/waybill', (req, res) => {

  let notifyData: WaybillNotify = req.body;

  // todo check if waybill exists

  sendWaybillNotification(notifyData, host)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    })
});

module.exports = router;
