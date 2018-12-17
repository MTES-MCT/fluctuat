import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/index';
import { shareReplay, switchMap, tap } from 'rxjs/internal/operators';
import { Contract } from '../contract';
import { ContractStatus } from '../contract-status.enum';
import { ContractService } from '../contract.service';

@Component({
  selector: 'flu-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {

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
