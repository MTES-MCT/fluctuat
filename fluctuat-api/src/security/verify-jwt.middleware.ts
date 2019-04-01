import { Request } from 'express';
import { User } from '../models/user';
import { getTokenFromCookie, getTokenFromHeaders, tokenDecode } from './security-utils';

export type UserRequest = Request & { user: User };

export const verifyJWT = (req: UserRequest, res, next) => {
  const token = getTokenFromHeaders(req) || getTokenFromCookie(req);

  try {
    req.user = tokenDecode(token);
    next();
  } catch (error) {
    console.log('Verify JWT: ', error.message);
    return res.status(401).send('Invalid Token');
  }
};
