import { Router } from 'express';
import { SmsService } from '../sms/sms.service';
import { WaybillNotify } from '../models/waybill.notify';

const router = Router();

let smsConfig = JSON.parse(require('fs').readFileSync('.data/sms.config.json'));
const smsService = new SmsService(smsConfig.token);

router.post('/waybill', (req, res) => {

  let notifyData: WaybillNotify = req.body;

  // todo check if waybill exists

  const sms = `La Lettre de voiture ${notifyData.waybillId} est disponible sur fluctuat.` +
    ` ${req.headers.origin}/acces-lettre-de-voiture?id=${notifyData.waybillId}`;

  smsService.sendSms(notifyData.cellphone, sms)
    .then(() => console.log('sms sent'))
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    })
});

module.exports = router;
