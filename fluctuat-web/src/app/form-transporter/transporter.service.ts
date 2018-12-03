import { Injectable } from '@angular/core';

import { Transporter } from './transporter';

@Injectable()
export class TransporterService {

  save(transporter: Transporter) {
    localStorage.transporter = JSON.stringify(transporter);
  }

  get() {
    return localStorage.transporter ? JSON.parse(localStorage.transporter) : new Transporter();
  }
}
