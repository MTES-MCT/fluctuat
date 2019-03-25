const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../.data/config.json').jwtSecret;

/** Generate hash for a given password */
export const generateHash = (password) => bcrypt.hashSync(password, 10);

/** @return if the given password match with hash*/
export const isPasswordMatch = (password, hash) => bcrypt.compareSync(password, hash);

export const generateToken = (obj, options?) => jwt.sign(obj, JWT_SECRET, options);

export const tokenDecode = (token, options?) => jwt.verify(token, JWT_SECRET, options);

/**@return token from request headers */
export const getTokenFromHeaders = (req) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) return;

  return authorization.replace('Bearer ', '')
};
