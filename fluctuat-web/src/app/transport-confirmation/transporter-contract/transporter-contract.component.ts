import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs/index';
import { shareReplay } from 'rxjs/internal/operators';

import { ContractService } from '../../providers/contract.service';
import { DeliveryService } from '../../providers/delivery.service';
import { TransporterService } from '../../providers/transporter.service';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-transporter-contract',
  templateUrl: './transporter-contract.component.html'
})
export class TransporterContractComponent implements OnInit {

  contract$: Observable<Contract>;

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.contract$ = id ? this.getContract(id) : of(this.createContract());
    });
  }

  createContract() {
    return Object.assign(new Contract(), {
      delivery: this.deliveryService.get(),
      transporter: this.transporterService.get(),
    });
  }

  getContract(id) {
    return this.contractService.get(id).pipe(shareReplay(1));
  }

  send(contract) {
    this.contract$ = this.contractService.create(contract);
  }

}
