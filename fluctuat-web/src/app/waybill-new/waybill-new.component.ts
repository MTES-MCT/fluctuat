import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from './waybill.service';
import { ResultHelper } from './result-helper';
import { Waybill } from './waybill.model';
import { OrderInfo } from './order-info.model';
import { WaybillOrderInfoComponent } from './waybill-order-info/waybill-order-info.component';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  @ViewChild(WaybillOrderInfoComponent)
  orderFormComponent: WaybillOrderInfoComponent;

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
        return throwError('Un problème est survenu. Veuillez réessayer plus tard.');
      })
    ).subscribe((waybill: Waybill) => {
      console.log(waybill);
      this.result.success()
      this.router.navigate(['lettre-de-voiture', waybill.id, 'chargement'])
    }, (err) => this.result.error(err))
  }

}
