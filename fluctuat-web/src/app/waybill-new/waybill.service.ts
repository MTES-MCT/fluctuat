import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './waybill.model';

@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  constructor(private http: HttpClient) {
  }

  create(waybill: Waybill): Observable<Waybill> {
    return this.http.post<Waybill>('/api/waybill', waybill)
  }

  sendLoadInfo(id: string, loadInfo: any) {
    return this.http.put(`/api/waybill/${id}/load-info`, loadInfo);
  }
}
