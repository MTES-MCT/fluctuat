import { Router } from 'express';

import { buildApiKeyToken } from '../security/security-utils';
import { verifyAdmin } from '../security/verify-admin.middleware';
import { verifyJWT } from '../security/verify-jwt.middleware';
import * as apiKeyStorage from '../storage/api-key.storage';

const apiKeyRoute = Router();

/** Only admins can use this api */
apiKeyRoute.use(verifyJWT, verifyAdmin);

/** get all api keys */
apiKeyRoute.get('/', async (req, res) => {
  const apiKeys = await apiKeyStorage.getAll();

  res.json(apiKeys);
});

/** create a new api key */
apiKeyRoute.post('/', async (req, res) => {

  const owner: string = req.body.owner;

  const key = buildApiKeyToken(owner);

  let apiKey = { key, owner };

  apiKey = await apiKeyStorage.put(apiKey);

  res.status(201).json(apiKey);
});

/** delete an api key */
apiKeyRoute.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await apiKeyStorage.deleteKey(id);

  res.sendStatus(204);
});

export { apiKeyRoute };
