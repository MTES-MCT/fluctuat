import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Contract } from '../../delivery/contract';
import { ContractService } from '../../delivery/contract.service';
import { ShipService } from '../../form-transporter/ship.service';
import { LoadInfoService } from '../form-loading/load-info.service';

@Component({
  selector: 'flu-waybill-load',
  templateUrl: './waybill-load.component.html'
})
export class WaybillLoadComponent implements OnInit {

  contract$: Observable<Contract>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractService: ContractService,
              private shipService: ShipService,
              private loadInfoService: LoadInfoService) {
  }

  ngOnInit() {

    this.contract$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.contractService.get(params.get('id'))),
      tap((contract) => {
        contract.loadInfo = this.loadInfoService.get();
        contract.ship = this.shipService.get();
      }),
      shareReplay(1)
    );
  }

  send(contract) {
    this.contractService.load(contract.id, contract.ship, contract.loadInfo).subscribe(() => {
      this.router.navigateByUrl('/mes-transports')
    })
  }

}
