import { User } from '../models/user';
import { UserModel } from './schemas/user.schema';

const get = (email) => {
  return UserModel.findOne({ email })
};

const put = (user: User) => {
  return new UserModel(user).save()
};

export { get, put }
