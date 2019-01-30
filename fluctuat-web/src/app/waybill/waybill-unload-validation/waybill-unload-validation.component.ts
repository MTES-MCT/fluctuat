import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Waybill } from '../shared/models/waybill.model';
import { ResultHelper } from '../../core/result-helper';
import { WaybillService } from '../shared/waybill.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-waybill-unload-validation',
  templateUrl: './waybill-unload-validation.component.html'
})
export class WaybillUnloadValidationComponent implements OnInit {

  waybillId: string;
  waybill$: Observable<Waybill>;

  result: ResultHelper = new ResultHelper();

  constructor(private waybillService: WaybillService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybill$ = this.waybillService.get(this.waybillId)
      .pipe(shareReplay(1))
  }

  validateUnloadInfo(waybill: Waybill) {
    this.result.waiting();

    this.waybillService.validateUnloadInfo(this.waybillId).pipe(
      tap((unloadInfo) => waybill.unloadInfo = unloadInfo), // update unloadInfo
      catchError((error) => {
          console.error(error);
          return throwError(GENERIC_ERROR_MSG)
        }
      ))
      .subscribe(() => this.result.success(), (err => this.result.error(err)));
  }

}
