import { Router } from 'express';
import * as waybillStorage from '../storage/waybill-storage'
import { UserRequest, verifyJWT } from '../security/verify-jwt.middleware';
import { Contacts } from '../models/contacts';

const router = Router();

router.get('/me', verifyJWT, async (req: UserRequest, res) => {
  const userEmail: string = req.user.email;

  const contacts: Contacts = await waybillStorage.findContacts(userEmail);

  res.json(contacts);
});

module.exports = router;
