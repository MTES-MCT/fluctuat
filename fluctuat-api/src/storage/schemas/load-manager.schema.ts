import { Schema } from 'mongoose';

export const LoadManagerSchema: Schema = new Schema({
  name: String,
  jobFunction: String
});
