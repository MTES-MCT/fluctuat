import { Response, Router } from 'express';
import { Waybill } from '../models/waybill';
import { validateUnloadInfo } from '../service/waybill-validation.service';
import { fetchWaybillFromUnLoad } from './fetch-waybill-from-unload.middleware';
import { WaybillRequest } from './fetch-waybill.middleware';

const waybillUnloadValidationRoute = Router();

waybillUnloadValidationRoute.get('/:id/waybill', fetchWaybillFromUnLoad, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillUnloadValidationRoute.post('/:id/validate', fetchWaybillFromUnLoad, async (req: WaybillRequest, res: Response) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = await validateUnloadInfo(waybill);

  res.json(unloadInfo);
});

export { waybillUnloadValidationRoute };
