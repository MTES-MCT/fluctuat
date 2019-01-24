import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { LoadInfo } from '../models/load-info';
import { Waybill } from '../models/waybill';
import { UnloadInfo } from '../models/unload-info';

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
  let waybill: Waybill = req.body;

  waybill.id = generateId();
  waybill.loadInfo = new LoadInfo();
  waybill.unloadInfo = new UnloadInfo();

  waybillStorage.put(waybill);

  res.status(201).json(waybill);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill);
});

router.get('/:id/order-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.order);
});

router.put('/:id/order-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.order = req.body;

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.put('/:id/load-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.loadInfo = req.body;

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.get('/:id/load-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.loadInfo);
});

router.post('/:id/load-info/validate', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  const loadInfo = waybill.loadInfo;

  if (!loadInfo.validatedAt) {
    loadInfo.validatedAt = new Date();
    waybillStorage.put(waybill);
  }

  res.json(loadInfo);
});

router.get('/:id/unload-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  return res.json(waybill.unloadInfo);
});


router.put('/:id/unload-info', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  waybill.unloadInfo = req.body;

  waybillStorage.put(waybill);

  res.status(204).end();
});

router.post('/:id/unload-info/validate', (req, res) => {
  const id = req.params.id;

  const waybill: Waybill = waybillStorage.get(id);
  //TODO handle 404

  const unloadInfo = waybill.unloadInfo;

  if (!unloadInfo.validatedAt) {
    unloadInfo.validatedAt = new Date();
    waybillStorage.put(waybill);
  }

  res.json(unloadInfo);
});

module.exports = router;
