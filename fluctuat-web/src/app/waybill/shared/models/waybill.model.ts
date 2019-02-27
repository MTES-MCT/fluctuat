import { OrderInfo } from './order-info.model';
import { LoadInfo } from './load-info.model';
import { UnloadInfo } from './unload-info.model';

export class Waybill {

  code: string;
  order: OrderInfo = new OrderInfo();
  loadInfo: LoadInfo = new LoadInfo();
  unloadInfo: UnloadInfo = new UnloadInfo();
  documentUrl: string;

}
