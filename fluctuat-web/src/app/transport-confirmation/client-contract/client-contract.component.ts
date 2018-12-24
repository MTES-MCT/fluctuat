import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { ContractService } from '../../providers/contract.service';
import { ContractStatus } from '../../shared/model/contract-status.enum';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-client-contract',
  templateUrl: './client-contract.component.html'
})
export class ClientContractComponent implements OnInit {

  contract$: Observable<Contract>;

  readonly STATUS = ContractStatus;

  constructor(private contractService: ContractService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.contractService.get(params.get('id'))),
      shareReplay(1)
    );
  }

  accept(contract) {
    this.contractService.accept(contract.id).pipe(
      tap(() => console.log('contract accepted')),
      // TODO optim: avoid resend a get request
      switchMap(() => this.contractService.get(contract.id))
    ).subscribe((contractUpdated: Contract) => {
      contract.status = contractUpdated.status;
      contract.acceptedAt = contractUpdated.acceptedAt;
    });
  }

}
