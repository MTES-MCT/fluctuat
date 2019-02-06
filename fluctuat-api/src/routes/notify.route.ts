import { Router } from 'express';
import { WaybillNotify } from '../models/waybill.notify';
import { sendWaybillNotification } from '../service/send-waybill.service';

const router = Router();

router.post('/waybill', (req, res) => {

  let notifyData: WaybillNotify = req.body;

  // todo check if waybill exists

  sendWaybillNotification(notifyData, req.headers.origin as string)
    .then(() => console.log('sms sent'))
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    })
});

module.exports = router;
