import { Component } from '@angular/core';
import { ContractService } from '../form-new-delivery/contract.service';

@Component({
  selector: 'flu-summary',
  templateUrl: './summary.component.html',
  styleUrls: [ './summary.component.sass' ]
})
export class SummaryComponent {

  available: boolean;

  constructor(private contractService: ContractService) {
  }

  send() {
    this.contractService.send().subscribe(() => {
      this.available = true;
      return console.log('send ok!');
    });
  }

}
