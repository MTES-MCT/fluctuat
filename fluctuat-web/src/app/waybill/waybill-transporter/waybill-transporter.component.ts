import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs'
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { LoadInfoService } from '../../providers/load-info.service';
import { ShipService } from '../../providers/ship.service';
import { UnloadInfoService } from '../../providers/unload-info.service';
import { ContractStatus } from '../../shared/model/contract-status.enum';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-waybill-transporter',
  templateUrl: './waybill-transporter.component.html'
})
export class WaybillTransporterComponent implements OnInit {

  contract$: Observable<Contract>;

  errorMsg: string;

  readonly STATUS = ContractStatus;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractService: ContractService,
              private shipService: ShipService,
              private loadInfoService: LoadInfoService,
              private unloadInfoService: UnloadInfoService) {
  }

  ngOnInit() {

    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.contractService.get(params.get('id'))),
      tap((contract) => {

        if (contract.loadedAt && contract.unloadedAt) {
          return;
        }

        // unload validation
        if (contract.loadedAt && contract.status === this.STATUS.CONFIRMED) {
          contract.unloadInfo = this.unloadInfoService.get(contract.id);
          return;
        }

        // load validation
        if (!contract.loadedAt) {
          contract.loadInfo = this.loadInfoService.get(contract.id);
          contract.ship = this.shipService.get();
        }
      }),
      shareReplay(1)
    );
  }

  saveLoadInfo(contract) {
    this.errorMsg = undefined;

    this.contractService.load(contract.id, contract.ship, contract.loadInfo).pipe(
      // clean loadInfo
      tap(() => this.loadInfoService.clear(contract.id)),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => this.router.navigateByUrl('/transporteur/mes-transports'), error => this.errorMsg = error)
  }

  saveUnloadInfo(contract) {
    this.errorMsg = undefined;

    this.contractService.unload(contract.id, contract.unloadInfo).pipe(
      tap(() => this.unloadInfoService.clear(contract.id)),
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => this.router.navigateByUrl('transporteur/mes-transports'), error => this.errorMsg = error)
  }

}
