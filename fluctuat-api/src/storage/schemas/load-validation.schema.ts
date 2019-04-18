import { Schema } from 'mongoose';

export const LoadValidationSchema: Schema = new Schema({
  code: String,
  waybillId: String
});
