import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { LoadInfo } from '../models/load-info';
import { Waybill } from '../models/waybill';

const randomstring = require('randomstring');

const router = Router();

const generateId = () => {

  const id = randomstring.generate({
    length: 6,
    readable: true,
    capitalization: 'uppercase'
  });
  // if id exist retry;
  return waybillStorage.get(id) ? generateId() : id;
};

router.post('/', (req, res) => {
  let waybill = req.body;

  waybill.id = generateId();
  waybillStorage.put(waybill);

  res.status(201).json(waybill);
});

router.put('/:id/load-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO 404

  const loadInfo: LoadInfo = req.body;
  console.log(loadInfo);
  waybill.loadInfo = loadInfo;

  waybillStorage.put(waybill);

  res.status(204).end();
});

module.exports = router;
