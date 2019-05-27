import { getApiKeyOwner, getTokenFromHeaders } from '../../security/security-utils';
import * as apiKeyStorage from '../../storage/api-key.storage';

export const verifyApiKey = async (req, res, next) => {
  const apiKey = getTokenFromHeaders(req);

  try {
    req.owner = getApiKeyOwner(apiKey);

    if (!req.owner) {
      return res.status(401).send('Invalid api key');
    }

    const apiKeyStored = await apiKeyStorage.get(apiKey);
    if (!apiKeyStored) {
      return res.status(401).send('Api key expired');
    }

    next();
  } catch (error) {
    console.log('Verify api key: ', error.message);
    return res.status(401).send('Invalid api key');
  }

};
