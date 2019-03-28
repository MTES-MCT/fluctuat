import { getTokenFromCookie, getTokenFromHeaders, tokenDecode } from './security-utils';
import { Request } from 'express';
import { User } from '../models/user';

export type UserRequest = Request & { user: User }

export const verifyJWT = (req: UserRequest, res, next) => {
  let token = getTokenFromHeaders(req) || getTokenFromCookie(req);

  try {
    req.user = tokenDecode(token);
    next();
  } catch (error) {
    console.log('Verify JWT: ', error.message);
    return res.status(401).send('Invalid Token');
  }
};
