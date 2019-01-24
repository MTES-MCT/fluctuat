import { OrderInfo } from './order-info';
import { LoadInfo } from './load-info';
import { UnloadInfo } from './unload-info';

export class Waybill {
  id: string;

  order: OrderInfo;
  loadInfo: LoadInfo;
  unloadInfo: UnloadInfo
}
