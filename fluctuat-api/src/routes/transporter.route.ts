import { Router } from 'express';
import * as transporterStorage from '../storage/transporter-storage';

const router = Router();

router.get('/me', (req, res) => {
  const id = 0;
  return res.json(transporterStorage.get(id));
});

router.put('/me', (req, res) => {
  const id = 0;
  transporterStorage.patch(id, req.body);

  return res.status(204).end()
});

module.exports = router;
