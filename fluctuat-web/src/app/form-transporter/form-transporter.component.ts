import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Transporter } from './transporter';

import { TransporterService } from './transporter.service';

@Component({
  selector: 'flu-form-transporter',
  templateUrl: './form-transporter.component.html'
})
export class FormTransporterComponent implements OnInit {

  transporter: Transporter = new Transporter();

  @ViewChild('transporterForm')
  public transporterForm: NgForm;
  public formSubmitted = false;

  constructor(private transporterService: TransporterService, private router: Router) {
  }

  ngOnInit() {
    this.transporter = this.transporterService.get();
  }

  save() {
    this.formSubmitted = true;
    if (this.transporterForm.invalid) {
      return;
    }

    this.transporterService.save(this.transporter);
    this.router.navigateByUrl('/trajet')
  }

  showError(formValue) {
    return formValue.invalid && (this.transporterForm.submitted || formValue.dirty || formValue.touched)
  }
}
