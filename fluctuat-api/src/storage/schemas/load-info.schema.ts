import { Schema } from 'mongoose';
import { LoadManagerSchema } from './load-manager.schema';

export const LoadInfoSchema: Schema = new Schema({
  startDate: String,
  endDate: String,
  merchandiseWeight: String,
  comments: String,
  loadManager: LoadManagerSchema,

  sentAt: Date,
  validatedAt: Date,
});
