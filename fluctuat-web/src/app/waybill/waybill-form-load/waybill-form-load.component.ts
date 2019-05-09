import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'flu-waybill-form-load',
  templateUrl: './waybill-form-load.component.html'
})
export class WaybillFormLoadComponent implements OnInit {

  loadInfoForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  readonly ports = PortList;

  constructor(private formBuilder: FormBuilder, private waybillService: WaybillService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybillService.getLoadInfo(this.waybillId)
      .subscribe((loadInfo) => this.fillForm(loadInfo));
  }

  fillForm(loadInfo: LoadInfo) {
    this.loadInfoForm = this.formBuilder.group({
      startDate: [loadInfo.startDate],
      endDate: [loadInfo.endDate],
      merchandiseWeight: [loadInfo.merchandiseWeight, FluValidators.quantity],
      comments: [loadInfo.comments],
      loadManager: this.formBuilder.group({
        name: [loadInfo.loadManager.name],
        jobFunction: [loadInfo.loadManager.jobFunction]
      })
    });
  }

  sendLoadInfo() {
    if (this.loadInfoForm.invalid) {
      return this.result.error('Veuillez vérifier votre saisie');
    }

    this.result.waiting();

    this.waybillService.sendLoadInfo(this.waybillId, this.loadInfoForm.value).pipe(
      catchError((error) => {
          const errMsg = error.status === 400 ? error.error : GENERIC_ERROR_MSG;
          return throwError(errMsg);
        }
      ))
      .subscribe(() => {
        this.result.success();
        this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail']);

      }, (err => this.result.error(err)));
  }
}
