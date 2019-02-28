import { OrderInfo } from '../../../shared/models/order-info.model';

export class WaybillOrderFormValue {
  order: OrderInfo;
  originInfo: {
    origin: string;
    loadManagerEmail: string;
  };
  destinationInfo: {
    destination: string;
    arrivalDate: string;
    loadManagerEmail: string;
  };
  merchandiseInfo: {
    merchandiseType: string;
    merchandisePrice: string;
  }
}
