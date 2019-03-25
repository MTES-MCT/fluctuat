import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  type: String,
  hash: String,
  admin: Boolean,
  recoverPasswordAt: Number
});
