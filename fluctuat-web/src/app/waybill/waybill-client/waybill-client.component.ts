import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { ContractStatus } from '../../shared/model/contract-status.enum';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-client-waybill',
  templateUrl: './waybill-client.component.html'
})
export class WaybillClientComponent implements OnInit {

  contract$: Observable<Contract>;

  errorMsg: string;

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
    this.errorMsg = undefined;

    this.contractService.confirm(contract.id).pipe(
      tap(() => console.log('waybill confirmed')),
      tap((contract) => this.contract$ = of(contract)),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => console.log('contract confirmed'), error => this.errorMsg = error)
  }

  received(contract) {
    this.errorMsg = undefined;

    this.contractService.received(contract.id).pipe(
      tap((contract) => this.contract$ = of(contract)),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => console.log('contract accepted'), error => this.errorMsg = error)
  }

}
