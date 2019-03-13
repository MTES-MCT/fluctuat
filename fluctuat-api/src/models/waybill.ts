import { OrderInfo } from './order-info';
import { LoadInfo } from './load-info';

export class Waybill {
  code: string;
  owner: string;

  order: OrderInfo;
  loadInfo: LoadInfo;
  unloadInfo: LoadInfo;

  documentUrl: string;
}
