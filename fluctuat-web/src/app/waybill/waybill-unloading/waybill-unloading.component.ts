import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultHelper } from '../shared/result-helper';
import { WaybillService } from '../shared/waybill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UnloadInfo } from '../shared/models/unload-info.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
          return throwError('Un problème est survenu. Veuillez réessayer plus tard.')
        }
      ))
      .subscribe(() => {
        this.result.success();
        this.router.navigate(['lettre-de-voiture', this.waybillId, 'detail'])
      }, (err => this.result.error(err)));
  }
}
