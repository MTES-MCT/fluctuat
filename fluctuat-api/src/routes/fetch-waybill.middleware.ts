import { get } from '../storage/waybill-storage'

export const fetchWaybill = (req, res, next) => {
  const id = req.params.id;
  const waybill = get(id);

  if (!waybill) {
    return res.status(404).send(`La lettre de voiture ${id} n'existe pas.`);
  }

  req.waybill = waybill;
  next();
};
