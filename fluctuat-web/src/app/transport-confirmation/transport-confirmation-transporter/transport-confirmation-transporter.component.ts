import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { DeliveryService } from '../../providers/delivery.service';
import { TransporterService } from '../../providers/transporter.service';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-transport-confirmation-transporter',
  templateUrl: './transport-confirmation-transporter.component.html'
})
export class TransportConfirmationTransporterComponent implements OnInit {

  contract$: Observable<Contract>;

  errorMsg: string;
  waitingFor: boolean;

  constructor(private contractService: ContractService,
              private transporterService: TransporterService,
              private deliveryService: DeliveryService,
              private route: ActivatedRoute,
              private router: Router) {
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
    if (this.waitingFor) {
      return;
    }
    this.errorMsg = undefined;
    this.waitingFor = true;

    this.contractService.create(contract).pipe(
      tap((contract) => this.contract$ = of(contract)),
      //clean delivery
      tap(() => this.deliveryService.clear()),
      tap(() => this.waitingFor = false),
      catchError((error) => {
        console.error(error);
        this.waitingFor = false;
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe((contract) => {
      console.log('contract created');
      this.router.navigateByUrl(`/transporteur/contrat/${contract.id}`);
    }, error => this.errorMsg = error);

  }

}
