import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { WaybillOrderFormComponent } from '../shared/waybill-order-form/waybill-order-form.component';
import { WaybillService } from '../../shared/waybill.service';
import { OrderInfo } from '../../shared/models/order-info.model';
import { Waybill } from '../../shared/models/waybill.model';
import { ResultHelper } from '../../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';
import { ContactsService } from '../../shared/contacts.service';
import { Contacts } from '../../shared/models/contacts';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  @ViewChild(WaybillOrderFormComponent)
  orderFormComponent: WaybillOrderFormComponent;

  result: ResultHelper = new ResultHelper();

  contacts$: Observable<Contacts>;

  constructor(private waybillService: WaybillService, private contactsService: ContactsService,
              private router: Router) {
  }

  ngOnInit() {
    this.orderFormComponent.setValue(new OrderInfo());
    this.contacts$ = this.contactsService.get().pipe(shareReplay(1))
  }

  create() {
    if (this.orderFormComponent.orderForm.invalid) {
      return this.result.error("Veuillez vérifier votre saisie");
    }

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
      this.router.navigate(['lettre-de-voiture', waybill.code, 'detail'])
    }, (err) => this.result.error(err))
  }

}
