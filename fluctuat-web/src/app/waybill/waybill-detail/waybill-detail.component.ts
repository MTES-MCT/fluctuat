import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Waybill } from '../shared/models/waybill.model';
import { WaybillService } from '../shared/waybill.service';

@Component({
  selector: 'flu-waybill-detail',
  templateUrl: './waybill-detail.component.html'
})
export class WaybillDetailComponent implements OnInit {

  waybill$: Observable<Waybill>;
  waybillId: string;

  showShareModal = false;

  constructor(private waybillService: WaybillService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.paramMap.get('id');

    this.waybill$ = this.waybillService.get(this.waybillId)
      .pipe(shareReplay(1));

  }

  openShareModal() {
    this.showShareModal = true;
  }
}
