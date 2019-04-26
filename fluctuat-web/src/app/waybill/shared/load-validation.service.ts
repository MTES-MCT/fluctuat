import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './models/waybill.model';
import { LoadInfo } from './models/load-info.model';

@Injectable()
export class LoadValidationService {

  constructor(private http: HttpClient) {
  }

  get(code: string): Observable<Waybill> {
    return this.http.get<Waybill>(`/api/load-validation/${code}/waybill`);
  }

  validateLoadInfo(code: string): Observable<LoadInfo> {
    return this.http.post<LoadInfo>(`/api/load-validation/${code}/validate`, null);
  }
}
