import { Response, Router } from 'express';
import { Waybill } from '../models/waybill';
import { sendWaybill } from '../service/send-waybill.service';
import * as waybillStorage from '../storage/waybill-storage';
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const waybillUnloadValidationRoute = Router();

waybillUnloadValidationRoute.get('/:id/waybill', fetchWaybill, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillUnloadValidationRoute.post('/:id/validate', fetchWaybill, async (req: WaybillRequest, res: Response) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = waybill.unloadInfo;

  // if already validated return unloadInfo
  if (unloadInfo.validatedAt) {
    return res.json(unloadInfo);
  }

  unloadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  // send waybill by email
  sendWaybill(waybill)
    .then(() => console.log('waybill sent'))
    .catch(console.error);

  res.json(unloadInfo);
});

export { waybillUnloadValidationRoute };
