import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transporter } from './transporter';

import { TransporterService } from './transporter.service';

@Component({
  selector: 'flu-form-transporter',
  templateUrl: './form-transporter.component.html'
})
export class FormTransporterComponent implements OnInit {

  transporter: Transporter = new Transporter();

  constructor(private transporterService: TransporterService, private router: Router) {
  }

  ngOnInit() {
    this.transporter = this.transporterService.get();
  }

  save() {
    this.transporterService.save(this.transporter);
    this.router.navigateByUrl('/trajet')
  }
}
