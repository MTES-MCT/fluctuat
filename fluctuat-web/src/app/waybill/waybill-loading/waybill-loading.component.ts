import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ResultHelper } from '../shared/result-helper';
import { WaybillService } from '../shared/waybill.service';
import { LoadInfo } from '../shared/models/load-info.model';
import { PortList } from './ports-list';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-waybill-loading',
  templateUrl: './waybill-loading.component.html'
})
export class WaybillLoadingComponent implements OnInit {

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
      .subscribe((loadInfo) => this.fillForm(loadInfo))
  }

  fillForm(loadInfo: LoadInfo) {
    this.loadInfoForm = this.formBuilder.group({
      origin: [loadInfo.origin],
      destination: [loadInfo.destination],
      arrivalDate: [loadInfo.arrivalDate],
      merchandiseType: [loadInfo.merchandiseType],
      merchandiseWeight: [loadInfo.merchandiseWeight],
      merchandisePrice: [loadInfo.merchandisePrice],
      loadStartDate: [loadInfo.loadStartDate],
      loadEndDate: [loadInfo.loadEndDate],
      comments: [loadInfo.comments],
      loadManager: this.formBuilder.group({
        name: [loadInfo.loadManager.name],
        jobFunction: [loadInfo.loadManager.jobFunction]
      })
    })
  }

  sendLoadInfo() {
    this.result.waiting();

    this.waybillService.sendLoadInfo(this.waybillId, this.loadInfoForm.value).pipe(
      catchError((error) => {
          console.error(error);
          return throwError(GENERIC_ERROR_MSG)
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
}
