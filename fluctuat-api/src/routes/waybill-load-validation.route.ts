import { Response, Router } from 'express';
import { validateLoadInfo } from 'service/waybill-validation.service';
import { fetchWaybill, WaybillRequest } from './fetch-waybill.middleware';

const waybillLoadValidationRoute = Router();

waybillLoadValidationRoute.get('/:id/waybill', fetchWaybill, (req: WaybillRequest, res: Response) => {
  res.json(req.waybill);
});

waybillLoadValidationRoute.post('/:id/validate', fetchWaybill, async (req: WaybillRequest, res: Response) => {
  const waybill = req.waybill;

  const loadInfo = validateLoadInfo(waybill);

  res.json(loadInfo);
});

export { waybillLoadValidationRoute };
