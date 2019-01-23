import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from './waybill.service';
import { ResultHelper } from './result-helper';
import { Waybill } from './waybill.model';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  orderForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  constructor(private fromBuilder: FormBuilder, private waybillService: WaybillService,
              private router: Router) {
  }

  ngOnInit() {
    this.orderForm = this.fromBuilder.group({
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
    const waybill = new Waybill();
    waybill.order = this.orderForm.value;
    this.waybillService.create(waybill).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe((waybill: Waybill) => {
      console.log(waybill);
      this.result.success()
      this.router.navigate(['lettre-de-voiture', waybill.id, 'chargement'])
    }, (err) => this.result.error(err))
  }

}
