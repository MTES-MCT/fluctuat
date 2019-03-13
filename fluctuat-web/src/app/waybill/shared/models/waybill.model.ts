import { OrderInfo } from './order-info.model';
import { LoadInfo } from './load-info.model';

export class Waybill {

  code: string;
  order: OrderInfo = new OrderInfo();
  loadInfo: LoadInfo = new LoadInfo();
  unloadInfo: LoadInfo = new LoadInfo();
  documentUrl: string;

}
