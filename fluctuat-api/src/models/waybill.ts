import { OrderInfo } from './order-info';
import { LoadInfo } from './load-info';

export class Waybill {
  id: string;

  order: OrderInfo;
  loadInfo: LoadInfo;
}
