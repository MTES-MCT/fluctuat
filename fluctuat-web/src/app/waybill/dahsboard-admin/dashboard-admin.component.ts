import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Waybill } from '../shared/models/waybill.model';
import { WaybillService } from '../shared/waybill.service';


@Component({
  selector: 'flu-dashboard-admin',
  templateUrl: './dashboard-admin.component.html'
})
export class DashboardAdminComponent implements OnInit {

  waybills$: Observable<Waybill[]>;

  constructor(private waybillService: WaybillService) {
  }

  ngOnInit() {
    this.waybills$ = this.waybillService.getAll().pipe(
      shareReplay(1)
    )
  }
}
