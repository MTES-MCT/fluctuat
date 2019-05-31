import { Schema } from 'mongoose';
import { LoadInfoSchema } from './load-info.schema';
import { OrderInfoSchema } from './order-info.schema';

export const WaybillSchema: Schema = new Schema({
  code: String,
  owner: String,

  orderInfo: OrderInfoSchema,
  loadInfo: LoadInfoSchema,
  unloadInfo: LoadInfoSchema,

  documentUrl: String
});
