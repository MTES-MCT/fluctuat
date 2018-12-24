import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ContractService } from '../providers/contract.service';
import { ContractStatus } from '../shared/model/contract-status.enum';
import { Contract } from '../shared/model/contract.model';

@Component({
  selector: 'flu-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  readonly STATUS = ContractStatus;
  contracts$: Observable<Contract[]>;

  constructor(private contractService: ContractService) {
  }

  ngOnInit() {
    this.contracts$ = this.contractService.getAll().pipe(
      shareReplay(1)
    );
  }

}
