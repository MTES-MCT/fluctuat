import { Injectable } from '@angular/core';
import { LoadInfo } from '../shared/model/load-info.model';

@Injectable()
export class LoadInfoService {

  save(loadInfo: LoadInfo) {
    localStorage.loadInfo = JSON.stringify(loadInfo)
  }

  get() {
    return localStorage.loadInfo ? JSON.parse(localStorage.loadInfo) : new LoadInfo();
  }
}
