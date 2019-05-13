import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {
  }

  getStats = (): Observable<StatsInfo> => this.http.get<StatsInfo>('/api/stats');
}


