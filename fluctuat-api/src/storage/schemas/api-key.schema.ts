import { Schema } from 'mongoose';

export const ApiKeySchema: Schema = new Schema({
  key: String,
  owner: String
});
