import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import { ContractService } from '../../providers/contract.service';
import { UnloadInfoService } from '../../providers/unload-info.service';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-waybill-unload',
  templateUrl: './waybill-unload.component.html'
})
export class WaybillUnloadComponent implements OnInit {

  contract$: Observable<Contract>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractService: ContractService,
              private unloadInfoService: UnloadInfoService) {
  }

  ngOnInit() {

    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.contractService.get(params.get('id'))),
      tap((contract) => contract.unloadInfo = this.unloadInfoService.get()),
      shareReplay(1)
    );
  }

  send(contract) {
    this.contractService.unload(contract.id, contract.unloadInfo).subscribe(() => {
      this.router.navigateByUrl('/mes-transports')
    })
  }
}
