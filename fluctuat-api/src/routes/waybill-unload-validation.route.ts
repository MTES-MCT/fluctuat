import { Response, Router } from 'express';
import { Waybill } from '../models/waybill';
import { validateUnloadInfo } from '../service/waybill-validation.service';
import { unloadValidationStorage } from '../storage/unload-validation.storage';
import { WaybillRequest } from '../types';
import { buildFetchWaybillForValidation } from './build-fetch-waybill-for-validation';

const waybillUnloadValidationRoute = Router();

const fetchWaybillFromUnLoad = buildFetchWaybillForValidation(unloadValidationStorage.get);

waybillUnloadValidationRoute.get('/:id/waybill', fetchWaybillFromUnLoad, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillUnloadValidationRoute.post('/:id/validate', fetchWaybillFromUnLoad, async (req: WaybillRequest, res: Response) => {
  const waybill: Waybill = req.waybill;

  const unloadInfo = await validateUnloadInfo(waybill);

  res.json(unloadInfo);
});

export { waybillUnloadValidationRoute };
