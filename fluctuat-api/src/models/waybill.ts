import { OrderInfo } from './order-info';
import { LoadInfo } from './load-info';
import { UnloadInfo } from './unload-info';

export class Waybill {
  id: string;
  owner: string;

  order: OrderInfo;
  loadInfo: LoadInfo;
  unloadInfo: UnloadInfo;

  documentUrl: string;
}
