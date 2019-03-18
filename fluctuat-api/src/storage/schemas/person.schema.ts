import { Schema } from 'mongoose';

export const PersonSchema: Schema = new Schema({
  name: String,
  email: String
}, { _id: false });
