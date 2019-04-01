import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { getConfig } from '../service/config.service';

const config = getConfig();
const JWT_SECRET = config.jwtSecret;
const SECURE = config.secure;

/** Generate hash for a given password */
export const generateHash = (password) => bcrypt.hashSync(password, 10);

/** @return if the given password match with hash */
export const isPasswordMatch = (password, hash) => bcrypt.compareSync(password, hash);

export const generateToken = (obj, options?) => jwt.sign(obj, JWT_SECRET, options);

export const tokenDecode = (token, options?) => jwt.verify(token, JWT_SECRET, options);

/** @return token from request headers */
export const getTokenFromHeaders = (req: Request) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return;
  }

  return authorization.replace('Bearer ', '');
};

export const getTokenFromCookie = (req: Request) => {
  return req.cookies.sid;
};

export const setTokenCookie = (res: Response, token: string, maxAge = 0) => {
  res.cookie('sid', token, {
    httpOnly: true,
    secure: SECURE,
    sameSite: 'Strict',
    path: '/api',
    maxAge: maxAge * 1000
  });
};
