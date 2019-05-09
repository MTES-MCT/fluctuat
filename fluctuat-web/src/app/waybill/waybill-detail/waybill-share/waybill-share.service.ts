import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaybillShare } from './waybill-share.model';

@Injectable()
export class WaybillShareService {

  constructor(private http: HttpClient) {
  }

  sendNotification(waybillShare: WaybillShare) {
    return this.http.post('/api/notify/waybill', waybillShare);
  }
}
