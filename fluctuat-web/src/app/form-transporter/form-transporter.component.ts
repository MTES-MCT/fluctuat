import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipService } from '../providers/ship.service';

import { TransporterService } from '../providers/transporter.service';
import { Company } from '../shared/model/company.model';
import { Ship } from '../shared/model/ship.model';

@Component({
  selector: 'flu-form-transporter',
  templateUrl: './form-transporter.component.html'
})
export class FormTransporterComponent implements OnInit {

  transporter = new Company();
  ship = new Ship();

  @ViewChild('transporterForm')
  public transporterForm: NgForm;
  public formSubmitted = false;

  constructor(private transporterService: TransporterService, private shipService: ShipService,
              private router: Router) {
  }

  ngOnInit() {
    this.transporter = this.transporterService.get();
    this.ship = this.shipService.get();
  }

  save() {
    this.formSubmitted = true;
    if (this.transporterForm.invalid) {
      console.warn('form invalid');
      return;
    }

    this.transporterService.save(this.transporter);
    this.shipService.save(this.ship);
    this.router.navigateByUrl('/mes-transports')
  }

  showError(formValue) {
    return formValue.invalid && (this.transporterForm.submitted || formValue.dirty || formValue.touched)
  }
}
