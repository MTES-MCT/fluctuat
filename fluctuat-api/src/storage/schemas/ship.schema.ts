import { Schema } from 'mongoose';

export const ShipSchema: Schema = new Schema({
  name: String,
  regNumber: String
});
