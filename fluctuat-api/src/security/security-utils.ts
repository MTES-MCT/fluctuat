const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret'; //FIXME do not forget replace this.

/** Generate hash for a given password */
export const generateHash = (password) => bcrypt.hashSync(password, 10);

/** @return if the given password match with hash*/
export const isPasswordMatch = (password, hash) => bcrypt.compareSync(password, hash);

export const generateToken = (user) => jwt.sign({email: user.email}, JWT_SECRET);

export const tokenDecode = (token) => jwt.verify(token, JWT_SECRET);

/**@return token from request headers */
export const getTokenFromHeaders = (req) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) return;

  return authorization.replace('Bearer ', '')
};