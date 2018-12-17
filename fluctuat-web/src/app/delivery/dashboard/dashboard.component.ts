import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { shareReplay } from 'rxjs/internal/operators';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'flu-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  contracts$: Observable<Contract[]>;

  constructor(private contractService: ContractService) {
  }

  ngOnInit() {
    this.contracts$ = this.contractService.getAll().pipe(
      shareReplay(1)
    );
  }

}
