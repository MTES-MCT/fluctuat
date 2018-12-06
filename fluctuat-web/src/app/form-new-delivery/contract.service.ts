import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TransporterService } from '../form-transporter/transporter.service';
import { DeliveryService } from './delivery.service';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient, private transporterService: TransporterService,
              private deliveryService: DeliveryService) {
  }

  send() {
    let body = {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get()
    };
    return this.http.post('/api/contract', body, { observe: 'response' })
      .pipe(map(response => response.headers.get('Location')));
  }
}
