import { Component, OnInit } from '@angular/core';
import { Transporter } from '../../form-transporter/transporter';
import { TransporterService } from '../../form-transporter/transporter.service';
import { ContractService } from '../contract.service';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'flu-summary',
  templateUrl: './summary.component.html',
  styleUrls: [ './summary.component.sass' ]
})
export class SummaryComponent implements OnInit {

  contract: Contract;

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
