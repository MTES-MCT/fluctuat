import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransporterService } from '../form-transporter/transporter.service';
import { DeliveryService } from './delivery.service';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient, private transporterService: TransporterService,
              private deliveryService: DeliveryService) {
  }

  send() {
    return this.http.post('/api/contract', {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get()
    })
  }
}
