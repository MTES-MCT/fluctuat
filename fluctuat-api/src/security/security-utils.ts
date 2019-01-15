const bcrypt = require('bcrypt');

/** Generate hash for a given password */
export const generateHash = (password) => bcrypt.hashSync(password, 10);

/** @return if the given password is valid */
export const validatePassword = (password, hash) => bcrypt.compareSync(password, hash);

