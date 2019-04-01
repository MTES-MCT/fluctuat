import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaybillNotify } from './models/waybill-notify.model';

@Injectable()
export class NotifyService {

  constructor(private http: HttpClient) {
  }

  sendNotification(notifyWaybill: WaybillNotify) {
    return this.http.post('/api/notify/waybill', notifyWaybill);
  }
}
