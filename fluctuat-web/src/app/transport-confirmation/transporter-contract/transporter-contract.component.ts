import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../providers/contract.service';
import { DeliveryService } from '../../providers/delivery.service';
import { TransporterService } from '../../providers/transporter.service';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-transporter-contract',
  templateUrl: './transporter-contract.component.html'
})
export class TransporterContractComponent implements OnInit {

  contract: Contract;

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService) {
  }

  ngOnInit() {
    this.contract = Object.assign(new Contract(), {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get(),
    })
  }

  send() {
    this.contractService.create(this.contract).subscribe((contract: Contract) => {
      this.contract = contract;
    });
  }

}
