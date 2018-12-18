import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Contract } from '../contract';
import { ContractStatus } from '../contract-status.enum';
import { ContractService } from '../contract.service';

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
