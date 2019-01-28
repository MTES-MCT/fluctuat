import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Waybill } from '../shared/models/waybill.model';
import { WaybillService } from '../shared/waybill.service';

@Component({
  selector: 'flu-waybill-summary',
  templateUrl: './waybill-summary.component.html'
})
export class WaybillSummaryComponent implements OnInit {

  waybill$: Observable<Waybill>;
  waybillId: string;

  constructor(private waybillService: WaybillService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybill$ = this.waybillService.get(this.waybillId)
      .pipe(shareReplay(1))

  }

  isNotLoadFinished(waybill: Waybill) {
    return waybill.loadInfo.sentAt && !waybill.loadInfo.validatedAt;
  }

  isLoadFinished(waybill: Waybill) {
    return waybill.loadInfo.validatedAt
  }

  isNotUnloadFinished(waybill: Waybill) {
    return waybill.unloadInfo.sentAt && !waybill.unloadInfo.validatedAt
  }

  isUnloadFinished(waybill: Waybill) {
    return waybill.unloadInfo.validatedAt
  }
}
