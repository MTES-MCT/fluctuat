import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Contract } from '../../delivery/contract';
import { ContractService } from '../../delivery/contract.service';

@Component({
  selector: 'flu-waybill-confirm',
  templateUrl: './waybill-confirm.component.html'
})
export class WaybillConfirmComponent implements OnInit {

  contract$: Observable<Contract>;

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
