import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Waybill } from '../shared/models/waybill.model';
import { WaybillService } from '../shared/waybill.service';
import { StatusOption } from './status-option.enum';
import { PortInfo } from '../shared/models/port-info.model';
import { LoadInfo } from '../shared/models/load-info.model';

@Component({
  selector: 'flu-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  waybills$: Observable<Waybill[]>;
  filteredWaybills$: Observable<Waybill[]>;

  statusFilter = StatusOption.ALL;

  public readonly STATUS_OPTION = StatusOption;

  constructor(public waybillService: WaybillService, public datePipe: DatePipe) {
  }

  ngOnInit() {
    this.waybills$ = this.waybillService.getAllMe().pipe(
      shareReplay(1)
    );

    this.refreshFilteredWaybills();
  }

  refreshFilteredWaybills() {
    const getStatusFilter = (option: StatusOption) => {
      switch (option) {
        case StatusOption.ALL:
          return () => true;
        case StatusOption.END:
          return (waybill) => !!waybill.unloadInfo.validatedAt;
        case StatusOption.IN_PROGRESS:
          return (waybill) => !waybill.unloadInfo.validatedAt;
      }
    };

    this.filteredWaybills$ = this.waybills$.pipe(
      map((waybills) => waybills.filter(getStatusFilter(this.statusFilter)))
    );
  }

  getStatus(waybill: Waybill) {
    if (waybill.unloadInfo.validatedAt) {
      return 'Fini';
    }

    if (waybill.unloadInfo.sentAt) {
      return 'Déchargement en cours';
    }

    if (waybill.loadInfo.validatedAt) {
      return 'Chargément confirmé';
    }

    if (waybill.loadInfo.sentAt) {
      return 'Chargement en cours';
    }

    return 'Crée';
  }

  getLoadInfoDate = (waybill: Waybill) => this.formatLoadInfoDate(waybill.orderInfo.originInfo, waybill.loadInfo);

  getUnloadInfoDate = (waybill: Waybill) => this.formatLoadInfoDate(waybill.orderInfo.destinationInfo, waybill.unloadInfo);

  private formatLoadInfoDate(portInfo: PortInfo, loadInfo: LoadInfo) {
    if (loadInfo.endDate) {
      return this.datePipe.transform(loadInfo.endDate, 'dd/MM/y, HH:mm');
    }

    if (portInfo.expectedDate) {
      return this.datePipe.transform(portInfo.expectedDate, 'shortDate');
    }

    return 'non renseignée';
  }

}
