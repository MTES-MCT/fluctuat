import { Schema } from 'mongoose';
import { OrderInfoSchema } from './order-info.schema';
import { LoadInfoSchema } from './load-info.schema';
import { UnloadInfoSchema } from './unload-info.schema';

export const WaybillSchema: Schema = new Schema({
  code: String,
  owner: String,

  order: OrderInfoSchema,
  loadInfo: LoadInfoSchema,
  unloadInfo: UnloadInfoSchema,

  documentUrl: String
});
