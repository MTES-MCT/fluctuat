import { Router } from 'express';
import * as transporterStorage from '../storage/transporter-storage';

const router = Router();

router.get('/me', (req, res) => {
  console.log('get transporter data');

  const id = 0;
  return res.json(transporterStorage.get(id));
});

router.put('/me', (req, res) => {
  console.log('update transporter data')
  const id = 0;
  transporterStorage.patch(id, req.body);

  return res.status(204).end()
});

module.exports = router;
