import { Router } from 'express';

import * as userStorage from '../storage/user-storage';
import { generateHash, generateToken, isPasswordMatch } from '../security/security-utils';
import { UserCredentials } from '../models/user-credentials';

const router = Router();

const getUserFromCredentials = async (credentials: UserCredentials) => {
  const user = await userStorage.get(credentials.email);

  if (!user || !isPasswordMatch(credentials.password, user.hash)) {
    return;
  }

  return user;
};

router.post('/login', async (req, res) => {
  let credentials = req.body;

  let user = await getUserFromCredentials(credentials);

  if (!user) {
    return res.status(401).send('Erreur de connexion. Merci de vérifier les informations saisies.');
  }

  let token = generateToken(user);

  console.log(`User ${user.email} has been login`);

  return res.json({ token: token });
});

router.post('/sign-up', async (req, res) => {
  let credentials = req.body;

  if (!credentials || !credentials.email || !credentials.password) {
    return res.status(400).send(`Invalid request`)
  }

  const isExistingUser = await userStorage.get(credentials.email);
  if (isExistingUser) {
    return res.status(400).send(`Le compte ${credentials.email} existe déjà dans notre système.`)
  }

  let user = {
    email: credentials.email,
    hash: generateHash(credentials.password)
  };

  try {
    await userStorage.put(user);
    const token = generateToken(user);
    console.log(`user ${user.email} creates new account`);
    res.status(201).json({ token: token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

module.exports = router;
