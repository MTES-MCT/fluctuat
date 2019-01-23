import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill-new/waybill.service';
import { Observable } from 'rxjs';
import { Waybill } from '../waybill-new/waybill.model';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

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

}
