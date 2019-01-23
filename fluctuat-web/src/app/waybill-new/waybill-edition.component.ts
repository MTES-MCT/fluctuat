import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from './waybill.service';
import { ResultHelper } from './result-helper';
import { Waybill } from './waybill.model';
import { OrderInfo } from './order-info.model';
import { WaybillOrderInfoComponent } from './waybill-order-info/waybill-order-info.component';

@Component({
  selector: 'flu-waybill-edition',
  templateUrl: './waybill-edition.component.html'
})
export class WaybillEditionComponent implements OnInit {

  @ViewChild(WaybillOrderInfoComponent)
  orderFormComponent: WaybillOrderInfoComponent;

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
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe(() => {
      this.result.success()
      this.router.navigate(['lettre-de-voiture', this.waybillId, 'chargement'])
    }, (err) => this.result.error(err))
  }

}
