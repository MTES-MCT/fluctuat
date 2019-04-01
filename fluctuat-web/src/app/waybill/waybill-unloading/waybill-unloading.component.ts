import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from '../shared/waybill.service';
import { LoadInfo } from '../shared/models/load-info.model';
import { ResultHelper } from '../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';
import { FluValidators } from '../../core/form-validators/flu-validators';

@Component({
  selector: 'flu-waybill-unloading',
  templateUrl: './waybill-unloading.component.html'
})
export class WaybillUnloadingComponent implements OnInit {

  unloadInfoForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  constructor(private formBuilder: FormBuilder, private waybillService: WaybillService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybillService.getUnloadInfo(this.waybillId)
      .subscribe((unloadInfo) => this.fillForm(unloadInfo))
  }


  private fillForm(unloadInfo: LoadInfo) {
    this.unloadInfoForm = this.formBuilder.group({
      startDate: [unloadInfo.startDate],
      endDate: [unloadInfo.endDate],
      merchandiseWeight: [unloadInfo.merchandiseWeight, FluValidators.quantity],
      comments: [unloadInfo.comments],
      loadManager: this.formBuilder.group({
        name: [unloadInfo.loadManager.name],
        jobFunction: [unloadInfo.loadManager.jobFunction]
      })
    })
  }

  sendUnloadInfo() {
    if (this.unloadInfoForm.invalid) {
      return this.result.error('Veuillez vérifier votre saisie');
    }

    this.result.waiting();

    this.waybillService.sendUnloadInfo(this.waybillId, this.unloadInfoForm.value).pipe(
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
  }
}
