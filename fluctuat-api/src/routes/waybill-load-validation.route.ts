import { Response, Router } from 'express';
import { validateLoadInfo } from '../service/waybill-validation.service';
import { loadValidationStorage } from '../storage/load-validation.storage';
import { buildFetchWaybillForValidation } from './build-fetch-waybill-for-validation';
import { WaybillRequest } from './fetch-waybill.middleware';

const waybillLoadValidationRoute = Router();

const fetchWaybillFromLoad = buildFetchWaybillForValidation(loadValidationStorage.get);

waybillLoadValidationRoute.get('/:id/waybill', fetchWaybillFromLoad, async (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillLoadValidationRoute.post('/:id/validate', fetchWaybillFromLoad, async (req: WaybillRequest, res: Response) => {
  const waybill = req.waybill;

  const loadInfo = await validateLoadInfo(waybill);

  res.json(loadInfo);
});

export { waybillLoadValidationRoute };
