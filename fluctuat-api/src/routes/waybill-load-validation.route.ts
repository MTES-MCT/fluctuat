import { Response, Router } from 'express';
import { sendWaybillLoaded } from '../service/send-waybill.service';
import * as waybillStorage from '../storage/waybill-storage';
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const waybillLoadValidationRoute = Router();

waybillLoadValidationRoute.get('/:id/waybill', fetchWaybill, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillLoadValidationRoute.post('/:id/validate', fetchWaybill, async (req: WaybillRequest, res: Response) => {
  const waybill = req.waybill;

  const loadInfo = waybill.loadInfo;

  // if already validated return loadInfo
  if (loadInfo.validatedAt) {
    return res.json(loadInfo);
  }

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${waybill.code}/lettre-de-voiture.pdf`;

  loadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  sendWaybillLoaded(waybill)
    .then(() => console.log('waybill loaded email sent'))
    .catch(console.error);

  res.json(loadInfo);
});

export { waybillLoadValidationRoute };
