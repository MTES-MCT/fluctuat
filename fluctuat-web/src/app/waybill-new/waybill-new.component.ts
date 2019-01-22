import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from './waybill.service';
import { ResultHelper } from './result-helper';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  waybillForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  constructor(private fromBuilder: FormBuilder, private waybillService: WaybillService) {
  }

  ngOnInit() {
    this.waybillForm = this.fromBuilder.group({
      customer: this.buildPersonFormGroup(),
      sender: this.buildPersonFormGroup(),
      receiver: this.buildPersonFormGroup(),
      transporter: this.buildPersonFormGroup(),
      ship: this.fromBuilder.group({
        name: [''],
        regNumber: ['']
      })
    })
  }

  buildPersonFormGroup() {
    return this.fromBuilder.group({
      name: [''],
      email: ['', Validators.email]
    })
  }

  create() {
    this.result.waiting();

    this.waybillService.create(this.waybillForm.value).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe((result) => {
      console.log(result);
      this.result.success()
    }, (err) => this.result.error(err))
  }

}
