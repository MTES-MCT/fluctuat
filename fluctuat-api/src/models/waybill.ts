import { OrderInfo } from './order-info';
import { LoadInfo } from './load-info';

export class Waybill {
  code: string;
  owner: string;

  order: OrderInfo = new OrderInfo();
  loadInfo: LoadInfo = new LoadInfo();
  unloadInfo: LoadInfo = new LoadInfo();

  documentUrl: string;

  static fromObj = (obj) => Object.assign(new Waybill(), obj);
}
