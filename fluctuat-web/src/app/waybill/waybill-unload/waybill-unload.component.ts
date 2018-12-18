import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Contract } from '../../delivery/contract';
import { ContractService } from '../../delivery/contract.service';
import { UnloadInfoService } from '../form-unload/unload-info.service';

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
