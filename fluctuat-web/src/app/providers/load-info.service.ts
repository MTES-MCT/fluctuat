import { Injectable } from '@angular/core';
import { LoadInfo } from '../shared/model/load-info.model';

@Injectable()
export class LoadInfoService {

  save(loadInfo: LoadInfo) {
    sessionStorage.loadInfo = JSON.stringify(loadInfo)
  }

  get() {
    return sessionStorage.loadInfo ? JSON.parse(sessionStorage.loadInfo) : new LoadInfo();
  }

  clear() {
    delete sessionStorage.loadInfo;
  }
}
