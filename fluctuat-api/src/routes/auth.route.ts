import { Router } from 'express';

import { User } from '../models/user';
import { UserCredentials } from '../models/user-credentials';
import { UserData } from '../models/user-data';
import {
  generateHash,
  generateToken,
  isPasswordMatch,
  setTokenCookie,
  tokenDecode
} from '../security/security-utils';
import { sendRecoverPasswordEmail, sendWelcomeEmail } from '../service/account.service';
import * as userStorage from '../storage/user-storage';

const router = Router();

const getUserFromCredentials = async (credentials: UserCredentials) => {
  const user = await userStorage.get(credentials.email);

  if (!user || !isPasswordMatch(credentials.password, user.hash)) {
    return;
  }

  return user;
};

router.post('/login', async (req, res) => {
  const credentials = req.body;

  const user = await getUserFromCredentials(credentials);

  if (!user) {
    return res.status(401).send('Erreur de connexion. Merci de vérifier les informations saisies.');
  }

  const token = generateToken({ email: user.email, admin: user.admin }, { expiresIn: 2592000 });
  setTokenCookie(res, token, 2592000);

  console.log(`User ${user.email} has been login`);

  return res.json(UserData.fromUser(user));
});

router.post('/logout', (req, res) => {
  setTokenCookie(res, '0', 0); // expires token cookies

  return res.sendStatus(204);
});

router.post('/sign-up', async (req, res) => {

  const account = req.body;

  if (!account || !account.email || !account.name || !account.type) {
    return res.status(400).send(`Inscription erronée. Veuillez vérifier la saisie.`);
  }

  const isExistingUser = await userStorage.get(account.email);
  if (isExistingUser) {
    return res.status(400).send(`Le compte ${account.email} existe déjà dans notre système.`);
  }

  try {
    const user: User = {
      email: account.email,
      name: account.name,
      type: account.type,
      admin: false,
    };

    const recoverPayload = {
      sub: user.email,
      aud: 'change-password'
    };

    const token = generateToken(recoverPayload, { expiresIn: '2d' });

    // save ait in user to check it at change password request
    user.changePasswordAt = tokenDecode(token).iat;
    await userStorage.put(user);

    await sendWelcomeEmail(user, token);

    console.log(`${user.email} creates account`);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

router.post('/recover-password', async (req, res) => {
  const email = req.body.email;

  const user = await userStorage.get(email);

  if (!user) {
    return res.status(400).send(`Le compte  ${email} n'existe pas dans notre système.`);
  }

  const recoverPayload = {
    sub: user.email,
    aud: 'change-password'
  };

  const token = generateToken(recoverPayload, { expiresIn: '15m' });

  await sendRecoverPasswordEmail(user, token);

  console.log(`${email} request password recovery`);

  // save ait in user to check it at change password request
  user.changePasswordAt = tokenDecode(token).iat;
  user.save();

  res.sendStatus(204);

});

router.post('/change-password', async (req, res) => {
  const INVALID_TOKEN_MSG = 'Demande de changement du mot de passe invalide';

  if (!req.body || !req.body.token || !req.body.newPassword) {
    return res.status(400).send(INVALID_TOKEN_MSG);
  }

  let payload;

  try {
    const token = req.body.token;
    payload = tokenDecode(token, { audience: 'change-password' });
  } catch (error) {
    console.log(error.name, error.message);
    const errMsg = error.name === 'TokenExpiredError' ? 'La demande de changement a exipirée' : INVALID_TOKEN_MSG;
    return res.status(400).send(errMsg);
  }

  const user = await userStorage.get(payload.sub);

  // The iat and resetPasswordAt do not match if the password is already changed or another recover has been requested.
  if (user.changePasswordAt !== payload.iat) {
    return res.status(400).send(INVALID_TOKEN_MSG);
  }

  user.hash = generateHash(req.body.newPassword);
  user.changePasswordAt = undefined; // remove value for avoid to replay token

  await user.save();

  console.log(`user ${user.email} changes password successfully`);

  res.sendStatus(204);

});

module.exports = router;
