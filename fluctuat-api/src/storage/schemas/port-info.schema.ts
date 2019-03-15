import { Schema } from 'mongoose';

export const PortInfoSchema = new Schema({
  port: String,
  expectedDate: String,
  email: String
});
