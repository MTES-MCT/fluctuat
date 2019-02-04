import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifyWaybill } from './models/share-waybill.model';

@Injectable()
export class NotifyService {

  constructor(private http: HttpClient) {
  }

  sendNotification(notifyWaybill: NotifyWaybill) {
    return this.http.post('/api/notify/waybill', notifyWaybill)
  }
}
