import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { verifyJWT } from '../security/verify-jwt.middleware';

const router = Router();

router.get('/me', verifyJWT, async (req, res) => {
  const userEmail: string = req['user'].email;

  const contacts = await waybillStorage.findContacts(userEmail);

  res.json(contacts);
});

module.exports = router;
