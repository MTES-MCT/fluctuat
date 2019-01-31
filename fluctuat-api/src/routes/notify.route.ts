import { Router } from 'express';
import { SmsService } from '../sms/sms.service';

const router = Router();

let token = JSON.parse(require('fs').readFileSync('.data/sms.config.json'));
const smsService = new SmsService(token);

router.post('/waybill', (req, res) => {

  let smsData: {
    waybillId: string,
    cellPhone: string
  } = req.body;

  // todo check phone format
  // todo check waybill

  const sms = `La Lettre de voiture ${smsData.waybillId} est disponible sur fluctuat.` +
   `${req.headers.origin}/acces-lettre-de-voiture?id=${smsData.waybillId}`;

  smsService.sendSms(smsData.cellPhone, sms)
    .then(() => console.log('sms sent'))
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500))
});
