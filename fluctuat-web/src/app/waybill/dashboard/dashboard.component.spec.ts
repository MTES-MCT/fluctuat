import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { WaybillOptionsComponent } from '../shared/waybill-options/waybill-options.component';
import { WaybillService } from '../shared/waybill.service';
import { Waybill } from '../shared/models/waybill.model';
import { StatusOption } from './status-option.enum';
import { SharedModule } from '../../shared/shared.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const MockWaybillService = { getAllMe: () => of([]) };

  beforeEach(() => {
    registerLocaleData(localeFr);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        WaybillOptionsComponent
      ],
      providers: [
        { provide: WaybillService, useValue: MockWaybillService },
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        DatePipe
      ],
      imports: [RouterTestingModule, SharedModule, FormsModule]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

  });

  it('should create component', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('show all waybills at load', () => {
    const waybills = [new Waybill(), new Waybill()];
    jest.spyOn(component.waybillService, 'getAllMe').mockReturnValue(of(waybills));
    fixture.detectChanges();

    const shownWaybills = fixture.debugElement.queryAll(By.css('.card'));

    expect(shownWaybills).toHaveLength(2);
  });

  it('show waybill in progress', () => {
    const waybillEnded = new Waybill();
    waybillEnded.unloadInfo.validatedAt = new Date();
    const waybills = [new Waybill(), new Waybill(), waybillEnded];
    jest.spyOn(component.waybillService, 'getAllMe').mockReturnValue(of(waybills));
    component.statusFilter = StatusOption.IN_PROGRESS;
    fixture.detectChanges();

    const shownWaybills = fixture.debugElement.queryAll(By.css('.card'));

    expect(shownWaybills).toHaveLength(2);
  });

  it('show waybill completed', () => {
    const waybillEnded = new Waybill();
    waybillEnded.unloadInfo.validatedAt = new Date();
    const waybills = [new Waybill(), new Waybill(), waybillEnded];
    jest.spyOn(component.waybillService, 'getAllMe').mockReturnValue(of(waybills));
    component.statusFilter = StatusOption.END;
    fixture.detectChanges();

    const shownWaybills = fixture.debugElement.queryAll(By.css('.card'));

    expect(shownWaybills).toHaveLength(1);
  });

  it('loadInfoDate format loadInfo date', () => {
    const waybill = new Waybill();
    waybill.orderInfo.originInfo.expectedDate = new Date('2020-10-01');
    waybill.loadInfo.endDate = new Date('2020-10-02T09:55');

    const loadInfoDate = component.getLoadInfoDate(waybill);

    expect(loadInfoDate).toBe('02/10/2020, 09:55');
  });

  it('loadInfoDate format origin expected date if no loadInfo', () => {
    const waybill = new Waybill();
    waybill.orderInfo.originInfo.expectedDate = new Date('2020-10-01');

    const loadInfoDate = component.getLoadInfoDate(waybill);

    expect(loadInfoDate).toBe('01/10/2020');
  });

  it('loadInfoDAte returns non renseignée if both are undefined', () => {
    const waybill = new Waybill();

    const loadInfoDate = component.getLoadInfoDate(waybill);

    expect(loadInfoDate).toBe('non renseignée');
  });

});
