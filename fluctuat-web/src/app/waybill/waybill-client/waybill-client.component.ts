import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { Contract } from '../../shared/model/contract.model';
import { ContractStatus } from '../../shared/model/contract-status.enum';

@Component({
  selector: 'flu-client-waybill',
  templateUrl: './waybill-client.component.html'
})
export class WaybillClientComponent implements OnInit {

  contract$: Observable<Contract>;

  readonly STATUS = ContractStatus;

  constructor(private route: ActivatedRoute, private contractService: ContractService) {
  }

  ngOnInit() {
    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.contractService.get(params.get('id'))),
      shareReplay(1)
    );
  }

  confirm(contract) {

    this.contractService.confirm(contract.id).pipe(
      tap(() => console.log('waybill confirmed')),
      // TODO optim: avoid resend a get request
      switchMap(() => this.contractService.get(contract.id))
    ).subscribe((contractUpdated: Contract) => {
      contract.status = contractUpdated.status; // TODO look if need
      contract.confirmedAt = contractUpdated.confirmedAt;
    });
  }

  received(contract) {
    this.contractService.received(contract.id).pipe(
      switchMap(() => this.contractService.get(contract.id))
    ).subscribe((contractUpdated: Contract) => {
        contract.status = contractUpdated.status;
        contract.receivedAt = contractUpdated.confirmedAt;
      }
    );
  }

}
