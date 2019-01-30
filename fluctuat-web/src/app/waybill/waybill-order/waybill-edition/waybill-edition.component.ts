import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ResultHelper } from '../../shared/result-helper';
import { WaybillService } from '../../shared/waybill.service';
import { WaybillOrderFormComponent } from '../shared/waybill-order-form/waybill-order-form.component';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';

@Component({
  selector: 'flu-waybill-edition',
  templateUrl: './waybill-edition.component.html'
})
export class WaybillEditionComponent implements OnInit {

  @ViewChild(WaybillOrderFormComponent)
  orderFormComponent: WaybillOrderFormComponent;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  constructor(private waybillService: WaybillService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybillService.getOrderInfo(this.waybillId)
      .subscribe((orderInfo) => this.orderFormComponent.setValue(orderInfo))
  }

  sendOrderInfo() {
    this.result.waiting();

    this.waybillService.sendOrderInfo(this.waybillId, this.orderFormComponent.getValue()).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(GENERIC_ERROR_MSG);
      })
    ).subscribe(() => {
      this.result.success()
      this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail'])
    }, (err) => this.result.error(err))
  }

}
