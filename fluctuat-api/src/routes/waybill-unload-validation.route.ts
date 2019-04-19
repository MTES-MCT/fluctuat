import { Response, Router } from 'express';
import { Waybill } from '../models/waybill';
import { validateUnloadInfo } from '../service/waybill-validation.service';
import { get } from '../storage/unload-validation.storage';
import { buildFetchWaybillForValidation } from './build-fetch-waybill-for-validation';
import { WaybillRequest } from './fetch-waybill.middleware';

const waybillUnloadValidationRoute = Router();

const fetchWaybillFromUnLoad = buildFetchWaybillForValidation(get);

waybillUnloadValidationRoute.get('/:id/waybill', fetchWaybillFromUnLoad, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillUnloadValidationRoute.post('/:id/validate', fetchWaybillFromUnLoad, async (req: WaybillRequest, res: Response) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = await validateUnloadInfo(waybill);

  res.json(unloadInfo);
});

export { waybillUnloadValidationRoute };
