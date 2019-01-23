import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './waybill.model';
import { LoadInfo } from '../waybill-loading/load-info.model';
import { OrderInfo } from './order-info.model';

@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  constructor(private http: HttpClient) {
  }

  create(waybill: Waybill): Observable<Waybill> {
    return this.http.post<Waybill>('/api/waybill', waybill)
  }

  sendOrderInfo(id: string, orderInfo: OrderInfo) {
    return this.http.put(`/api/waybill/${id}/order-info`, orderInfo);
  }

  getOrderInfo(id: string): Observable<OrderInfo> {
    return this.http.get<OrderInfo>(`/api/waybill/${id}/order-info`);
  }

  sendLoadInfo(id: string, loadInfo: LoadInfo) {
    return this.http.put(`/api/waybill/${id}/load-info`, loadInfo);
  }

  getLoadInfo(id: string): Observable<LoadInfo> {
    return this.http.get<LoadInfo>(`/api/waybill/${id}/load-info`);
  }
}
