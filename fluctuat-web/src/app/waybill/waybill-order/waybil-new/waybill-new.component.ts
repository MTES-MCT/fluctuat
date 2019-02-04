import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillOrderFormComponent } from '../shared/waybill-order-form/waybill-order-form.component';
import { WaybillService } from '../../shared/waybill.service';
import { OrderInfo } from '../../shared/models/order-info.model';
import { Waybill } from '../../shared/models/waybill.model';
import { ResultHelper } from '../../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  @ViewChild(WaybillOrderFormComponent)
  orderFormComponent: WaybillOrderFormComponent;

  result: ResultHelper = new ResultHelper();

  constructor(private waybillService: WaybillService,
              private router: Router) {
  }

  ngOnInit() {
    this.orderFormComponent.setValue(new OrderInfo());
  }

  create() {
    this.result.waiting();
    const waybill = new Waybill();
    waybill.order = this.orderFormComponent.getValue();
    this.waybillService.create(waybill).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(GENERIC_ERROR_MSG);
      })
    ).subscribe((waybill: Waybill) => {
      console.log(waybill);
      this.result.success();
      this.router.navigate(['lettre-de-voiture', waybill.id, 'detail'])
    }, (err) => this.result.error(err))
  }

}