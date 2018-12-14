import { Component, OnInit } from '@angular/core';
import { ContractService } from '../form-new-delivery/contract.service';
import { Transporter } from '../form-transporter/transporter';
import { TransporterService } from '../form-transporter/transporter.service';
import { Delivery } from '../delivery/delivery';
import { DeliveryService } from '../delivery/delivery.service';

@Component({
  selector: 'flu-summary',
  templateUrl: './summary.component.html',
  styleUrls: [ './summary.component.sass' ]
})
export class SummaryComponent implements OnInit {

  contract: {id?: string, delivery: Delivery, transporter: Transporter};

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService) {
  }

  ngOnInit() {
    this.contract = {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get(),
    }
  }

  send() {
    this.contractService.create(this.contract).subscribe((location) => {
      this.contract.id = location.split('/').pop();
      console.log(location);
      window.open(location, '_blank');
    });
  }

  printAddress(address) {
    return `${address.street}, ${address.zipCode} ${address.city}`
  }

}
