import { Component } from '@angular/core';
import { ContractService } from '../form-new-delivery/contract.service';
import { DeliveryService } from '../form-new-delivery/delivery.service';
import { TransporterService } from '../form-transporter/transporter.service';

@Component({
  selector: 'flu-summary',
  templateUrl: './summary.component.html',
  styleUrls: [ './summary.component.sass' ]
})
export class SummaryComponent {

  contractId: string;

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService) {
  }

  send() {
    let contract = {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get(),
      id: this.contractId
    };

    this.contractService.create(contract).subscribe((location) => {
      this.contractId = location.split('/').pop();
      console.log(location);
      window.open(location, '_blank');
    });
  }

}
