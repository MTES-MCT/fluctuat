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

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const MockWaybillService = { getAllMe: () => of([]) };

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        WaybillOptionsComponent
      ],
      providers: [{ provide: WaybillService, useValue: MockWaybillService }],
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

    expect(shownWaybills).toHaveLength(2)
  });

  it('show waybill in progress', () => {
    let waybillEnded = new Waybill();
    waybillEnded.unloadInfo.validatedAt = new Date();
    const waybills = [new Waybill(), new Waybill(), waybillEnded];
    jest.spyOn(component.waybillService, 'getAllMe').mockReturnValue(of(waybills));
    component.statusFilter = StatusOption.IN_PROGRESS;
    fixture.detectChanges();

    const shownWaybills = fixture.debugElement.queryAll(By.css('.card'));

    expect(shownWaybills).toHaveLength(2)
  });

  it('show waybill completed', () => {
    let waybillEnded = new Waybill();
    waybillEnded.unloadInfo.validatedAt = new Date();
    const waybills = [new Waybill(), new Waybill(), waybillEnded];
    jest.spyOn(component.waybillService, 'getAllMe').mockReturnValue(of(waybills));
    component.statusFilter = StatusOption.END;
    fixture.detectChanges();

    const shownWaybills = fixture.debugElement.queryAll(By.css('.card'));

    expect(shownWaybills).toHaveLength(1)
  })

});
