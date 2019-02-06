import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { WaybillService } from '../shared/waybill.service';
import { UnloadInfo } from '../shared/models/unload-info.model';
import { ResultHelper } from '../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-waybill-unloading',
  templateUrl: './waybill-unloading.component.html'
})
export class WaybillUnloadingComponent implements OnInit {

  unloadInfoForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  showShareModal = false;

  constructor(private formBuilder: FormBuilder, private waybillService: WaybillService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybillService.getUnloadInfo(this.waybillId)
      .subscribe((unloadInfo) => this.fillForm(unloadInfo))
  }


  private fillForm(unloadInfo: UnloadInfo) {
    this.unloadInfoForm = this.formBuilder.group({
      unloadStartDate: [unloadInfo.unloadStartDate],
      unloadEndDate: [unloadInfo.unloadEndDate],
      merchandiseWeight: [unloadInfo.merchandiseWeight],
      comments: [unloadInfo.comments],
      unloadManager: this.formBuilder.group({
        name: [unloadInfo.unloadManager.name],
        jobFunction: [unloadInfo.unloadManager.jobFunction]
      })
    })
  }

  sendUnloadInfo() {
    this.result.waiting();

    this.waybillService.sendUnloadInfo(this.waybillId, this.unloadInfoForm.value).pipe(
      catchError((error) => {
          console.error(error);
          return throwError(GENERIC_ERROR_MSG)
        }
      ))
      .subscribe(() => {
        this.result.success();
        this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail'])
      }, (err => this.result.error(err)));
  }

  openShareModal() {
    this.showShareModal = true;
  }
}
