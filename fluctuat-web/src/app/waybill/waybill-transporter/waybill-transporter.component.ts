import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { shareReplay, switchMap, tap } from 'rxjs/operators';

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
          contract.unloadInfo = this.unloadInfoService.get();
          return;
        }

        // load validation
        if (!contract.loadedAt) {
          contract.loadInfo = this.loadInfoService.get();
          contract.ship = this.shipService.get();
        }
      }),
      shareReplay(1)
    );
  }

  saveLoadInfo(contract) {
    this.contractService.load(contract.id, contract.ship, contract.loadInfo)
      .subscribe(() => {
        // clean loadInfo
        this.loadInfoService.clear();
        return this.router.navigateByUrl('/mes-transports');
      })
  }

  saveUnloadInfo(contract) {
    this.contractService.unload(contract.id, contract.unloadInfo)
      .subscribe(() => {
        // clean unloadInfo
        this.unloadInfoService.clear();
        return this.router.navigateByUrl('/mes-transports');
      })
  }

}
