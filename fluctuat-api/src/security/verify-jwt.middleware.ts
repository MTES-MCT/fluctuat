import { UserRequest } from '../types';
import { getTokenFromCookie, tokenDecode } from './security-utils';

export const verifyJWT = (req: UserRequest, res, next) => {
  const token = getTokenFromCookie(req);

  try {
    req.user = tokenDecode(token);
    next();
  } catch (error) {
    console.log('Verify JWT: ', error.message);
    return res.status(401).send('Invalid Token');
  }
};
