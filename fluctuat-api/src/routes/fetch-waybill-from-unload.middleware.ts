import { get } from '../storage/unload-validation.storage';
import * as waybillStorage from '../storage/waybill-storage';
import { WaybillRequest } from './fetch-waybill.middleware';

const fetchWaybillFromUnLoad = async (req: WaybillRequest, res, next) => {
  const id = req.params.id;
  const { waybillId } = await get(id);

  if (!waybillId) {
    return res.status(404).send('Code de validation incorrecte');
  }

  req.waybill = await waybillStorage.get(waybillId);
  next();
};

export { fetchWaybillFromUnLoad };
