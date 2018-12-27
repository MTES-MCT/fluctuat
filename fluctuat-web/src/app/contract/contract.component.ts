import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/index';
import { shareReplay, switchMap } from 'rxjs/internal/operators';

import { ContractService } from '../providers/contract.service';
import { ContractStatus } from '../shared/model/contract-status.enum';
import { Contract } from '../shared/model/contract.model';

@Component({
  selector: 'flu-contract',
  templateUrl: './contract.component.html',
  styleUrls: [ './contract.component.sass' ]
})
export class ContractComponent implements OnInit {

  contract$: Observable<Contract>;
  readonly STATUS = ContractStatus;

  constructor(public contractService: ContractService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.getContract(params.get('id')))
    )
  }

  private getContract(id): Observable<Contract> {
    return this.contractService.get(id).pipe(shareReplay(1));
  }
}
