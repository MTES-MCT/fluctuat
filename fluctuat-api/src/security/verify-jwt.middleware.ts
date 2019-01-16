import { getTokenFromHeaders, tokenDecode } from './security-utils';

export const verifyJWT = (req, res, next) => {
  let token = getTokenFromHeaders(req);

  try {
    req.user = tokenDecode(token);
    next();
  } catch (error) {
    console.log('Verify JWT: ', error.message);
    return res.status(401).send('Invalid Token');
  }
};
