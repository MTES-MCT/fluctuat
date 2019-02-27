import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { WaybillService } from '../../shared/waybill.service';
import { WaybillOrderFormComponent } from '../shared/waybill-order-form/waybill-order-form.component';
import { ResultHelper } from '../../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';
import { ContactsService } from '../../shared/contacts.service';
import { Contacts } from '../../shared/models/contacts';
import { AuthService } from '../../../core/auth/auth.service';
import { Waybill } from '../../shared/models/waybill.model';

@Component({
  selector: 'flu-waybill-edition',
  templateUrl: './waybill-edition.component.html'
})
export class WaybillEditionComponent implements OnInit {

  @ViewChild(WaybillOrderFormComponent)
  orderFormComponent: WaybillOrderFormComponent;

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
      return this.orderFormComponent.setValue(waybill);
    });

    if (this.authService.isAuthenticated()) {
      this.contacts$ = this.contactService.get().pipe(shareReplay(1));
    }

  }

  sendOrderInfo() {
    if (this.orderFormComponent.waybillForm.invalid) {
      return this.result.error('Veuillez vérifier votre saisie');
    }

    this.result.waiting();

    this.waybillService.update(this.waybillId, this.orderFormComponent.getValue()).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(GENERIC_ERROR_MSG);
      })
    ).subscribe(() => {
      this.result.success();
      this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail'])
    }, (err) => this.result.error(err))
  }

  isNotLoadStarted(waybill: Waybill) {
    return !waybill.loadInfo.sentAt;
  }

  isLoadStarted(waybill: Waybill) {
    return !!waybill.loadInfo.sentAt;
  }

}
