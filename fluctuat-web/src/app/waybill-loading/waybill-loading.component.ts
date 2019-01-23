import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultHelper } from '../waybill-new/result-helper';
import { WaybillService } from '../waybill-new/waybill.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flu-waybill-loading',
  templateUrl: './waybill-loading.component.html'
})
export class WaybillLoadingComponent implements OnInit {

  loadInfoForm: FormGroup;

  result: ResultHelper = new ResultHelper();

  waybillId: string;

  constructor(private formBuilder: FormBuilder, private waybillService: WaybillService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.loadInfoForm = this.formBuilder.group({
      origin: [''],
      destination: [''],
      arrivalDate: [''],
      merchandiseType: [''],
      merchandiseWeight: [''],
      merchandisePrice: [''],
      loadStartDate: [''],
      loadEndDate: [''],
      comments: [''],
      loadManager: this.formBuilder.group({
        name: [''],
        jobFunction: ['']
      })
    })
  }

  sendLoadInfo() {
    this.result.waiting();

    this.waybillService.sendLoadInfo(this.waybillId, this.loadInfoForm.value).pipe(
      catchError((error) => {
          console.error(error);
          return throwError('Un problème est survenu. Veuillez réessayer plus tard.')
        }
      ))
      .subscribe(() => this.result.success(), (err => this.result.error(err)));

    console.log(this.loadInfoForm.value);
    console.log('send load info');
    this.result.success();
  }
}
