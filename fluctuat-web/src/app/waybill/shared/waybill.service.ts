import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './models/waybill.model';
import { LoadInfo } from './models/load-info.model';
import { OrderInfo } from './models/order-info.model';
import { UnloadInfo } from './models/unload-info.model';

@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  constructor(private http: HttpClient) {
  }

  create(waybill: Waybill): Observable<Waybill> {
    return this.http.post<Waybill>('/api/waybill', waybill)
  }

  get(id: string): Observable<Waybill> {
    return this.http.get<Waybill>(`/api/waybill/${id}`);
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

  sendUnloadInfo(id: string, unloadInfo: UnloadInfo) {
    return this.http.put(`/api/waybill/${id}/unload-info`, unloadInfo);
  }

  getUnloadInfo(id: string): Observable<UnloadInfo> {
    return this.http.get<UnloadInfo>(`/api/waybill/${id}/unload-info`)
  }

}
