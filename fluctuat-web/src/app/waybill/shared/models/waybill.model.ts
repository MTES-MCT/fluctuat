import { OrderInfo } from './order-info.model';
import { LoadInfo } from './load-info.model';
import { UnloadInfo } from './unload-info.model';

export class Waybill {

  id: string;
  order: OrderInfo;
  loadInfo: LoadInfo;
  unloadInfo: UnloadInfo;

}
