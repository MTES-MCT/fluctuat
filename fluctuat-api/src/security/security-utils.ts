import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { AppConfig } from '../app.config';

const JWT_SECRET = AppConfig.JWT_SECRET;
const SECURE = AppConfig.SECURE;

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

export const getTokenFromCookie = (req: Request) =>
  req.cookies.sid;

export const setTokenCookie = (res: Response, token: string, maxAge = 0) =>
  res.cookie('sid', token, {
    httpOnly: true,
    secure: SECURE,
    sameSite: 'Strict',
    path: '/api',
    maxAge: maxAge * 1000
  });

/** given a token verify if corresponds of public api token and then return the owner
 * @param token the token to decode
 * @return the email of the owner
 */
export const getApiKeyOwner = (token: string): string => {
  const apiKeyPayload = tokenDecode(token);
  if (apiKeyPayload.aud !== 'public_api') {
    return;
  }

  return apiKeyPayload.sub;
};

/**
 * build a apiKey of an owner
 * @param owner
 * @return the api key
 */
export const buildApiKeyToken = (owner: string): string => {
  const apiKeyPayload = {
    sub: owner,
    aud: 'public_api'
  };
  return generateToken(apiKeyPayload);
};
