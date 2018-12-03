import { Component, OnInit } from '@angular/core';

import { TransporterService } from './transporter.service';
import { Transporter } from './transporter';

@Component({
  selector: 'flu-form-transporter',
  templateUrl: './form-transporter.component.html'
})
export class FormTransporterComponent implements OnInit {

  transporter: Transporter = new Transporter();

  constructor(private transporterService: TransporterService) {
  }

  ngOnInit() {
    this.transporter = this.transporterService.get();
  }

  save() {
    this.transporterService.save(this.transporter)
  }
}
