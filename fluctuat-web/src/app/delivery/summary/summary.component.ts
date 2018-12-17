import { Component, OnInit } from '@angular/core';
import { TransporterService } from '../../form-transporter/transporter.service';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';
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
