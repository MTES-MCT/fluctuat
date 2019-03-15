import { Schema } from 'mongoose';

export const TransporterSchema: Schema = new Schema({
  name: String,
  email: String,
  cellphone: String
});
