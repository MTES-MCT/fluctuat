import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waybill } from './models/waybill.model';
import { LoadInfo } from './models/load-info.model';

@Injectable()
export class UnloadValidationService {

  constructor(private http: HttpClient) {
  }

  get(code: string): Observable<Waybill> {
    return this.http.get<Waybill>(`/api/unload-validation/${code}/waybill`);
  }

  validateUnloadInfo(code: string): Observable<LoadInfo> {
    return this.http.post<LoadInfo>(`/api/unload-validation/${code}/validate`, null);
  }
}
