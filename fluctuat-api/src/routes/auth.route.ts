import { Router } from 'express';

import * as userStorage from '../storage/user-storage';
import {
  generateHash,
  generateToken,
  isPasswordMatch,
  setTokenCookie,
  tokenDecode
} from '../security/security-utils';
import { UserCredentials } from '../models/user-credentials';
import { EmailService } from '../email/email.service';
import { EmailData } from '../email/email-data';
import { User } from '../models/user';

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

  let token = generateToken({ email: user.email, admin: user.admin }, { expiresIn: 2592000 });
  setTokenCookie(res, token, 2592000);

  console.log(`User ${user.email} has been login`);

  return res.json({ token: token });
});

router.post('/sign-up', async (req, res) => {

  let account = req.body;

  if (!account || !account.email || !account.name || !account.type) {
    return res.status(400).send(`Inscription erronée. Veuillez vérifier la saisie.`)
  }

  const isExistingUser = await userStorage.get(account.email);
  if (isExistingUser) {
    return res.status(400).send(`Le compte ${account.email} existe déjà dans notre système.`)
  }

  try {
    let user: User = {
      email: account.email,
      name: account.name,
      type: account.type,
      admin: false,
    };

    let recoverPayload = {
      sub: user.email,
      aud: 'change-password'
    };

    const token = generateToken(recoverPayload, { expiresIn: '2d' });

    // save ait in user to check it at change password request
    user.changePasswordAt = tokenDecode(token).iat;
    await userStorage.put(user);

    await emailService.sendEmail(welcomeEmail(user, token));

    console.log(`${user.email} creates account`);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

const welcomeEmail = (user, token): EmailData => {
  const changePasswordLink = `${host}/changement-mot-de-passe/?token=${token}`;

  return {
    to: [{ name: user.name, email: user.email }],
    subject: 'Votre compte sur Fluctu@t a été crée',
    body: {
      html: `<p>Bienvenue sur Fluctu@t,</p>
            <p>Votre compte a été crée, pour l'activer vous devez choisir votre mot de passe et vous connecter.</p>
            <p>Suivez ce lien pour finir l'activation de votre compte :</p>
            <p><a href="${changePasswordLink}">Activer mon compte</a></p>
            <br>
            <p>Cordialement,</p>
            <p>L'équipe de Fluctu@t</p>`
    }
  }
};

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
  user.changePasswordAt = tokenDecode(token).iat;
  user.save();

  res.sendStatus(204)

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
    return res.status(400).send(INVALID_TOKEN_MSG)
  }

  user.hash = generateHash(req.body.newPassword);
  user.changePasswordAt = undefined; // remove value for avoid to replay token

  await user.save();

  console.log(`user ${user.email} changes password successfully`);

  res.sendStatus(204)

});

const recoverPasswordEmail = (email, token): EmailData => {
  const changePasswordLink = `${host}/changement-mot-de-passe/?token=${token}`;

  return {
    to: [{ name: '', email: email }],
    subject: 'Réinitialisation du mot de passe',
    body: {
      html: `<p>Bonjour,</p>
            <p>Vous avez demandé une réinitialisation du mot de passe, il suffit de cliquer sur le lien ci-dessous afin de le modifier.</p>
            <p><a href="${changePasswordLink}">Changer mon mot de passe</a></p>
            <br>
            <p>Si vous n'êtes pas à l'origine de cette demande, n'hésitez pas à nous contacter. Il vous suffit de répondre à cet email.</p>
            <p>Cordialement,</p>
            <p>L'équipe de Fluctu@t</p>`
    }
  }
};

module.exports = router;
