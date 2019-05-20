import { getTokenFromHeaders, tokenDecode } from '../../security/security-utils';
import { UserRequest } from '../../types';

export const verifyApiKey = (req: UserRequest, res, next) => {
  const apiKey = getTokenFromHeaders(req);

  try {
    req.user = tokenDecode(apiKey);
    // TODO more thinks...
    next();
  } catch (error) {
    console.log('Verify api key: ', error.message);
    return res.status(401).send('Invalid api key');
  }

};
