import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  email: String,
  hash: String
});
