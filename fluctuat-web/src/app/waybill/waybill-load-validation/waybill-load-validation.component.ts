import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../shared/waybill.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Waybill } from '../shared/models/waybill.model';
import { ResultHelper } from '../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';
import { LoadValidationService } from '../shared/load-validation.service';

@Component({
  selector: 'flu-waybill-load-validation',
  templateUrl: './waybill-load-validation.component.html'
})
export class WaybillLoadValidationComponent implements OnInit {

  waybillId: string;
  waybill$: Observable<Waybill>;

  result: ResultHelper = new ResultHelper();

  constructor(private loadValidationService: LoadValidationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybill$ = this.loadValidationService.get(this.waybillId)
      .pipe(shareReplay(1));
  }

  validateLoadInfo(waybill: Waybill) {
    this.result.waiting();

    this.loadValidationService.validateLoadInfo(this.waybillId)
      .pipe(
        tap((loadInfo) => waybill.loadInfo = loadInfo), // update loadInfo
        catchError(() => throwError(GENERIC_ERROR_MSG))
      )
      .subscribe(() => this.result.success(), (err => this.result.error(err)));
  }

}
