import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'

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
  console.log(req.body);

  res.status(204).end();
});

module.exports = router;
