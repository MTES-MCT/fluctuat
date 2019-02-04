import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Waybill } from '../shared/models/waybill.model';
import { WaybillService } from '../shared/waybill.service';


@Component({
  selector: 'flu-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  waybills$: Observable<Waybill[]>;

  constructor(private waybillService: WaybillService) {
  }

  ngOnInit() {
    this.waybills$ = this.waybillService.getAllMe().pipe(
      shareReplay(1)
    );
  }

  getStatus(waybill: Waybill) {
    if (waybill.unloadInfo.validatedAt) {
      return 'Fini'
    }

    if (waybill.unloadInfo.sentAt) {
      return 'Déchargement en cours'
    }

    if (waybill.loadInfo.validatedAt) {
      return 'Chargément validé'
    }

    if (waybill.loadInfo.sentAt) {
      return 'Chargement en cours'
    }

    return 'Crée'
  }
}
