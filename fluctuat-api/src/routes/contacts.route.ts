import { Router } from 'express';
import { Contacts } from '../models/contacts';
import { verifyJWT } from '../security/verify-jwt.middleware';
import * as waybillStorage from '../storage/waybill-storage';
import { UserRequest } from '../types';

const contactsRoute = Router();

contactsRoute.get('/me', verifyJWT, async (req: UserRequest, res) => {
  const userEmail: string = req.user.email;

  const contacts: Contacts = await waybillStorage.findContacts(userEmail);

  res.json(contacts);
});

export { contactsRoute };
