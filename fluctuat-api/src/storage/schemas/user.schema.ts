import { Document, Schema, Model, model} from "mongoose";
import { User } from '../../models/user';

export interface IUserModel extends User, Document {}

export const UserSchema: Schema = new Schema({
  email: String,
  hash: String
});

export const UserModel: Model<IUserModel> = model<IUserModel>("User", UserSchema);
