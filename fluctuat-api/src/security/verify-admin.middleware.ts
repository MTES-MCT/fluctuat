import { UserRequest } from '../types';

export const verifyAdmin = (req: UserRequest, res, next) => {
  // you should verify admin in the database if remove user or revoke privileges is needed
  if (!req.user.admin) {
    return res.status(403).send('Not allowed');
  }
  next();
};
