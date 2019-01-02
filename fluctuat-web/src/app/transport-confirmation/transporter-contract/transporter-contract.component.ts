import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

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

  errorMsg: string;

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.contract$ = id ? this.getContract(id) : this.createContract();
    });
  }

  createContract() {
    return this.transporterService.get().pipe(
      map((transporter) => Object.assign(new Contract(), {
        delivery: this.deliveryService.get(),
        transporter: transporter,
      }))
    )
  }

  getContract(id) {
    return this.contractService.get(id).pipe(shareReplay(1));
  }

  send(contract) {
    this.errorMsg = undefined;

    this.contractService.create(contract).pipe(
      tap((contract) => this.contract$ = of(contract)),
      //clean delivery
      tap(() => this.deliveryService.clear()),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => {
      console.log('contract created')
    }, error => this.errorMsg = error);

  }

}
