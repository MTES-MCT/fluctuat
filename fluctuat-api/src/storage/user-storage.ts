import { User } from '../models/user';
import { Document, model, Model } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

interface UserDocument extends User, Document {
}

const UserDao: Model<UserDocument> = model<UserDocument>('User', UserSchema);

const get = (email) => UserDao.findOne({ email });

const put = (user: User) => new UserDao(user).save();

export { get, put }
