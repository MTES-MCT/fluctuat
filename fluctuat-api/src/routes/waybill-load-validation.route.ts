import { Response, Router } from 'express';
import { validateLoadInfo } from '../service/waybill-validation.service';
import { fetchWaybillFromLoad } from './fetch-waybill-from-load.middleware';
import { WaybillRequest } from './fetch-waybill.middleware';

const waybillLoadValidationRoute = Router();

waybillLoadValidationRoute.get('/:id/waybill', fetchWaybillFromLoad, async (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillLoadValidationRoute.post('/:id/validate', fetchWaybillFromLoad, async (req: WaybillRequest, res: Response) => {
  const waybill = req.waybill;

  const loadInfo = await validateLoadInfo(waybill);

  res.json(loadInfo);
});

export { waybillLoadValidationRoute };
