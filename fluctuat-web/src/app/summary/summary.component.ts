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
    this.contractService.send().subscribe((location) => {
      this.available = true;
      console.log(location);
      window.open(location, "_blank");
    });
  }

}
