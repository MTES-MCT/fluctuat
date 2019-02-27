import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ResultHelper } from '../../core/result-helper';
import { WaybillService } from '../shared/waybill.service';
import { LoadInfo } from '../shared/models/load-info.model';
import { PortList } from '../shared/ports-list';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';
import { FluValidators } from '../../core/form-validators/flu-validators';

@Component({
  selector: 'flu-waybill-loading',
  templateUrl: './waybill-loading.component.html'
})
export class WaybillLoadingComponent implements OnInit {

  loadInfoForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  readonly ports = PortList;

  showShareModal = false;

  constructor(private formBuilder: FormBuilder, private waybillService: WaybillService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybillService.getLoadInfo(this.waybillId)
      .subscribe((loadInfo) => this.fillForm(loadInfo))
  }

  fillForm(loadInfo: LoadInfo) {
    this.loadInfoForm = this.formBuilder.group({
      origin: [loadInfo.origin],
      destination: [loadInfo.destination],
      arrivalDate: [loadInfo.arrivalDate],
      merchandiseType: [loadInfo.merchandiseType],
      merchandiseWeight: [loadInfo.merchandiseWeight, FluValidators.quantity],
      merchandisePrice: [loadInfo.merchandisePrice, FluValidators.quantity],
      startDate: [loadInfo.startDate],
      endDate: [loadInfo.endDate],
      comments: [loadInfo.comments],
      loadManager: this.formBuilder.group({
        name: [loadInfo.loadManager.name],
        email: [loadInfo.loadManager.email, Validators.email],
        jobFunction: [loadInfo.loadManager.jobFunction]
      })
    })
  }

  sendLoadInfo() {
    if (this.loadInfoForm.invalid) {
      return this.result.error('Veuillez vérifier votre saisie');
    }

    this.result.waiting();

    this.waybillService.sendLoadInfo(this.waybillId, this.loadInfoForm.value).pipe(
      catchError((error) => {
          console.error(error);
          let errMsg = error.status === 400 ? error.error : GENERIC_ERROR_MSG;
          return throwError(errMsg)
        }
      ))
      .subscribe(() => {
        this.result.success();
        this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail'])

      }, (err => this.result.error(err)));

    console.log(this.loadInfoForm.value);
    console.log('send load info');
    this.result.success();
  }

  openShareModal() {
    this.showShareModal = true;
  }

  hasError(formValue) {
    return formValue.invalid && (formValue.dirty || formValue.touched)
  }
}
