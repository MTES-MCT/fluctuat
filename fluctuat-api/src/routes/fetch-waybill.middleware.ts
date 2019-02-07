import { get } from '../storage/waybill-storage'

export const fetchWaybill = async (req, res, next) => {
  const id = req.params.id;
  const waybill = await get(id.toUpperCase()); // case insensitive

  if (!waybill) {
    return res.status(404).send(`La lettre de voiture "${id}" n'existe pas.`);
  }

  req.waybill = waybill;
  next();
};
