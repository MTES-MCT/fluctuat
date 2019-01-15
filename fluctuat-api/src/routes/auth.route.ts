import { Router } from 'express';
import * as userStorage from '../storage/user-storage';
import { generateToken, isPasswordMatch } from '../security/security-utils';
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


module.exports = router;
