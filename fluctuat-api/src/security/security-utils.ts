const bcrypt = require('bcrypt');

/** Generate hash for a given password */
export const generateHash = (password) => bcrypt.hashSync(password, 10);

/** @return if the given password match with hash*/
export const isPasswordMatch = (password, hash) => bcrypt.compareSync(password, hash);

// TODO generateToken
export const generateToken = (user) => user.email;
