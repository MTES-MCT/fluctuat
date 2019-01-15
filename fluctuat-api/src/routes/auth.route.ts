import { Router } from 'express';

import * as userStorage from '../storage/user-storage';
import {
  generateHash,
  generateToken,
  getTokenFromHeaders,
  isPasswordMatch,
  tokenDecode
} from '../security/security-utils';
import { UserCredentials } from '../models/user-credentials';

const router = Router();

const getUserFromCredentials = (credentials: UserCredentials) => {
  const user = userStorage.get(credentials.email);
  if (!user || !isPasswordMatch(credentials.password, user.hash)) {
    return;
  }

  return user;
};

router.post('/login', (req, res) => {
  let credentials = req.body;

  let user = getUserFromCredentials(credentials);

  if (!user) {
    return res.status(401).send('Erreur de connexion. Merci de vérifier les informations saisies.');
  }

  let token = generateToken(user);

  return res.json({ token: token });
});

router.post('/sign-up', (req, res) => {
  let credentials = req.body;

  if (!credentials || !credentials.email || !credentials.password) {
    return res.status(400).send(`Invalid request`)
  }

  const isExistingUser = !!userStorage.get(credentials.email);

  if (isExistingUser) {
    return res.status(400).send(`Le compte ${credentials.email} existe déjà dans notre système.`)
  }

  let user = {
    email: credentials.email,
    hash: generateHash(credentials.password)
  };

  userStorage.put(user);

  const token = generateToken(user);

  return res.status(201).json({token: token});

});

router.get('/get-user', (req, res) => {
  const token = getTokenFromHeaders(req);
  let user;
  try {
    user = tokenDecode(token);
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }

  return res.json(user);
});

module.exports = router;
