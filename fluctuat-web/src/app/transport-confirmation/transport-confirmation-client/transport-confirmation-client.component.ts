import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { ContractStatus } from '../../shared/model/contract-status.enum';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-transport-confirmation-client',
  templateUrl: './transport-confirmation-client.component.html'
})
export class TransportConfirmationClientComponent implements OnInit {

  contract$: Observable<Contract>;

  errorMsg: string;

  readonly STATUS = ContractStatus;

  constructor(private contractService: ContractService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.getContract(params.get('id')))
    )
  }

  private getContract(id): Observable<Contract> {
    return this.contractService.get(id).pipe(shareReplay(1));
  }

  accept(contract) {
    this.errorMsg = undefined;

    this.contractService.accept(contract.id).pipe(
      tap((contract) => this.contract$ = of(contract)),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => console.log('contract accepted'), error => this.errorMsg = error);
  }

}
