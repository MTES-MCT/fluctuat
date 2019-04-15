import { LoadInfo } from './load-info';
import { OrderInfo } from './order-info';

export class Waybill {

  code: string;

  owner: string;

  order: OrderInfo = new OrderInfo();
  loadInfo: LoadInfo = new LoadInfo();
  unloadInfo: LoadInfo = new LoadInfo();

  documentUrl: string;

  static fromObj = (obj): Waybill => Object.assign(new Waybill(), obj);
}
