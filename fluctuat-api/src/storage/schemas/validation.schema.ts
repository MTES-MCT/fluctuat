import { Schema } from 'mongoose';

export const ValidationSchema: Schema = new Schema({
  code: String,
  waybillId: String
});
