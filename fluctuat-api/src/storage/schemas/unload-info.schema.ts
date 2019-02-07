import { Schema } from 'mongoose';
import { LoadManagerSchema } from './load-manager.schema';

export const UnloadInfoSchema: Schema = new Schema({
  unloadStartDate: String,
  unloadEndDate: String,
  merchandiseWeight: String,
  comments: String,
  unloadManager: LoadManagerSchema,

  sentAt: Date,
  validatedAt: Date
});
