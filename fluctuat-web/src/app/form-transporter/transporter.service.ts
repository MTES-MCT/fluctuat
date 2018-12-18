import { Injectable } from '@angular/core';

import { Company } from '../shared/company';

@Injectable()
export class TransporterService {

  save(transporter: Company) {
    localStorage.transporter = JSON.stringify(transporter);
  }

  get() {
    return localStorage.transporter ? JSON.parse(localStorage.transporter) : new Company();
  }
}
