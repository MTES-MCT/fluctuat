import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Company } from '../shared/model/company.model';

@Injectable()
export class TransporterService {

  constructor(private http: HttpClient) {
  }

  get() {
    if (sessionStorage.transporter) {
      return of(JSON.parse(sessionStorage.transporter));
    }

    return this.getTransporter().pipe(
      tap(this.saveTransporter)
    );
  }

  update(transporter: Company) {
    return this.http.put('/api/transporter/me', transporter).pipe(
      tap(() => this.saveTransporter(transporter))
    );
  }

  private getTransporter() {
    return this.http.get<Company>('/api/transporter/me')
  }

  private saveTransporter(transporter: Company) {
    sessionStorage.transporter = JSON.stringify(transporter);
  }
}
