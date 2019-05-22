import { getTokenFromHeaders, tokenDecode } from '../../security/security-utils';
import * as apiKeyStorage from '../../storage/api-key.storage';

export const verifyApiKey = async (req, res, next) => {
  const apiKey = getTokenFromHeaders(req);

  try {
    const apiKeyPayload = tokenDecode(apiKey);

    if (apiKeyPayload.aud !== 'public_api') {
      return res.status(401).send('Invalid api key');
    }

    const apiKeyStored = await apiKeyStorage.get(apiKey);
    if (!apiKeyStored) {
      return res.status(401).send('Api key expired');
    }

    req.owner = apiKeyPayload.sub;

    next();
  } catch (error) {
    console.log('Verify api key: ', error.message);
    return res.status(401).send('Invalid api key');
  }

};
