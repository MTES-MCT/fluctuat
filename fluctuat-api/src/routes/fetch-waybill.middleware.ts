import { Waybill } from '../models/waybill';
import { get } from '../storage/waybill-storage';
import { WaybillRequest } from '../types';

export const fetchWaybill = async (req: WaybillRequest, res, next) => {
  const id = req.params.id;
  const waybill: Waybill = await get(id.toUpperCase()); // case insensitive

  if (!waybill) {
    return res.status(404).send(`La lettre de voiture "${id}" n'existe pas.`);
  }

  req.waybill = waybill;
  next();
};
