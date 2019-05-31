import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { WaybillService } from '../../shared/waybill.service';
import { WaybillFormOrderComponent } from '../shared/waybill-form-order/waybill-form-order.component';
import { ResultHelper } from '../../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';
import { ContactsService } from '../../shared/contacts.service';
import { Contacts } from '../../shared/models/contacts.model';
import { AuthService } from '../../../core/auth/auth.service';
import { Waybill } from '../../shared/models/waybill.model';

@Component({
  selector: 'flu-waybill-form-order-edit',
  templateUrl: './waybill-form-order-edit.component.html'
})
export class WaybillFormOrderEditComponent implements OnInit {

  @ViewChild(WaybillFormOrderComponent)
  orderFormComponent: WaybillFormOrderComponent;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  contacts$: Observable<Contacts>;

  waybill$: Observable<Waybill>;

  constructor(private waybillService: WaybillService, private contactService: ContactsService,
              private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybill$ = this.waybillService.get(this.waybillId).pipe(shareReplay(1));

    this.waybill$.subscribe((waybill) => {
      return this.orderFormComponent.setValue(waybill.orderInfo);
    });

    if (this.authService.isAuthenticated()) {
      this.contacts$ = this.contactService.get().pipe(shareReplay(1));
    }

  }

  sendOrderInfo() {
    if (this.orderFormComponent.orderForm.invalid) {
      return this.result.error('Veuillez vérifier votre saisie');
    }

    this.result.waiting();

    this.waybillService.updateOrderInfo(this.waybillId, this.orderFormComponent.getValue()).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(GENERIC_ERROR_MSG);
      })
    ).subscribe(() => {
      this.result.success();
      this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail']);
    }, (err) => this.result.error(err));
  }

  isNotLoadStarted(waybill: Waybill) {
    return !waybill.loadInfo.sentAt;
  }

  isLoadStarted(waybill: Waybill) {
    return !!waybill.loadInfo.sentAt;
  }

}
