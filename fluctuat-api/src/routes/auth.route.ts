import { Router } from 'express';

import * as userStorage from '../storage/user-storage';
import {
  generateHash,
  generateToken,
  isPasswordMatch,
  tokenDecode
} from '../security/security-utils';
import { UserCredentials } from '../models/user-credentials';
import { EmailService } from '../email/email.service';
import { EmailData } from '../email/email-data';

const router = Router();
const emailService = EmailService.getInstance();
const config = require('../../.data/config.json');
const host = config.host;

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

  let token = generateToken({ email: user.email, admin: user.admin });

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
    admin: false,
    hash: generateHash(credentials.password)
  };

  try {
    await userStorage.put(user);
    const token = generateToken({ email: user.email, admin: user.admin });
    console.log(`user ${user.email} creates new account`);
    res.status(201).json({ token: token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

router.post('/recover-password', async (req, res) => {
  let email = req.body.email;

  const user = await userStorage.get(email);

  if (!user) {
    return res.status(400).send(`Le compte  ${email} n'existe pas dans notre système.`)
  }

  let recoverPayload = {
    sub: user.email,
    aud: 'change-password'
  };

  const token = generateToken(recoverPayload, { expiresIn: '15m' });

  await emailService.sendEmail(recoverPasswordEmail(email, token));

  console.log(`${email} request password recovery`);

  // save ait in user to check it at change password request
  user.recoverPasswordAt = tokenDecode(token).iat;
  user.save();

  res.sendStatus(200)

});

router.post('/change-password', async (req, res) => {
  let payload;

  try {
    const token = req.body.token;
    payload = tokenDecode(token, { audience: 'change-password' });
  } catch (error) {
    console.log(error);
    const errMsg = error.name === 'TokenExpiredError' ? 'La demande de changement a exipirée' : 'Demande de changement invalide';
    return res.status(400).send(errMsg);
  }

  const user = await userStorage.get(payload.sub);

  // The iat and resetPasswordAt do not match if the password is already changed or another recover has been requested.
  if (user.recoverPasswordAt !== payload.iat) {
    return res.status(400).send('Demande de changement invalide')
  }

  user.hash = generateHash(req.body.newPassword);
  user.recoverPasswordAt = undefined; // remove value for avoid to change password again

  await user.save();

  console.log(`user ${user.email} changes password successfully`);

  res.sendStatus(204)

});

const recoverPasswordEmail = (email, token): EmailData => {
  return {
    to: [{ name: '', email: email }],
    subject: 'Réinitialisation du mot de passe',
    body: {
      html: `<p>Bonjour</p>,
            <p>Vous avez demandé une réinitialisation de mot de passe, il suffit de cliquer sur le lien ci-dessous afin de le modifier.</p>
            <p><a href="${host}/edit-password/?token=${token}">Changer mon mot de passe</a></p>
            <br>
            <p>Si vous n'êtes pas à l'origine de cette demande, n'hésitez pas à nous contacter. Il vous suffit de répondre à cet email.</p>
            <p>Cordialement,</p>
            <p>L'équipe de Fluctu@t</p>`
    }
  }
};

module.exports = router;
