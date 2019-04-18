import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './models/waybill.model';
import { LoadInfo } from './models/load-info.model';
import { OrderInfo } from './models/order-info.model';

@Injectable()
export class WaybillService {

  constructor(private http: HttpClient) {
  }

  create(waybill: Waybill): Observable<Waybill> {
    return this.http.post<Waybill>('/api/waybill', waybill);
  }

  get(code: string): Observable<Waybill> {
    return this.http.get<Waybill>(`/api/waybill/${code}`);
  }

  updateOrderInfo(code: string, orderInfo: OrderInfo) {
    return this.http.put(`/api/waybill/${code}/order-info`, orderInfo);
  }

  sendLoadInfo(code: string, loadInfo: LoadInfo) {
    return this.http.put(`/api/waybill/${code}/load-info`, loadInfo);
  }

  getLoadInfo(code: string): Observable<LoadInfo> {
    return this.http.get<LoadInfo>(`/api/waybill/${code}/load-info`);
  }

  sendUnloadInfo(code: string, unloadInfo: LoadInfo) {
    return this.http.put(`/api/waybill/${code}/unload-info`, unloadInfo);
  }

  getUnloadInfo(code: string): Observable<LoadInfo> {
    return this.http.get<LoadInfo>(`/api/waybill/${code}/unload-info`);
  }

  getAllMe() {
    return this.http.get<Waybill[]>('/api/waybill/me');
  }

  getAll() {
    return this.http.get<Waybill[]>('/api/waybill');
  }
}
