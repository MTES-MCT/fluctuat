import { Schema } from 'mongoose';
import { LoadManagerSchema } from './load-manager.schema';

export const LoadInfoSchema: Schema = new Schema({
  origin: String,
  destination: String,
  arrivalDate: String,
  merchandiseType: String,
  merchandiseWeight: String,
  merchandisePrice: String,
  startDate: String,
  loadEndDate: String,
  comments: String,
  loadManager: LoadManagerSchema,

  sentAt: Date,
  validatedAt: Date,
});
