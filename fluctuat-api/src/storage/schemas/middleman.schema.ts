import { Schema } from 'mongoose';

export const MiddlemanShema = new Schema({
  name: String,
  email: String,
  isBroker: Boolean
});
