import { Response, Router } from 'express';
import { Waybill } from '../models/waybill';
import { validateUnloadInfo } from '../service/waybill-validation.service';
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const waybillUnloadValidationRoute = Router();

waybillUnloadValidationRoute.get('/:id/waybill', fetchWaybill, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillUnloadValidationRoute.post('/:id/validate', fetchWaybill, async (req: WaybillRequest, res: Response) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = validateUnloadInfo(waybill);

  res.json(unloadInfo);
});

export { waybillUnloadValidationRoute };
