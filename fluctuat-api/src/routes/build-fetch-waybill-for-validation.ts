import { LoadValidation } from '../models/load-validation';
import * as waybillStorage from '../storage/waybill-storage';
import { WaybillRequest } from '../types';

const buildFetchWaybillForValidation = (get: (id: string) => any) => async (req: WaybillRequest, res, next) => {
  const id = req.params.id;

  const validation: LoadValidation = await get(id);

  if (!validation) {
    return res.status(404).send('Code de validation incorrecte');
  }

  req.waybill = await waybillStorage.get(validation.waybillId);
  next();
};

export { buildFetchWaybillForValidation };
