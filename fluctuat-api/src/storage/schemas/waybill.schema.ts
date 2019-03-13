import { Schema } from 'mongoose';
import { OrderInfoSchema } from './order-info.schema';
import { LoadInfoSchema } from './load-info.schema';

export const WaybillSchema: Schema = new Schema({
  code: String,
  owner: String,

  order: OrderInfoSchema,
  loadInfo: LoadInfoSchema,
  unloadInfo: LoadInfoSchema,

  documentUrl: String
});
