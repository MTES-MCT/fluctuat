import { Injectable } from '@angular/core';
import { UnloadInfo } from '../shared/model/unload-info.model';

@Injectable()
export class UnloadInfoService {

  save(unloadInfo: UnloadInfo) {
    sessionStorage.unloadInfo = JSON.stringify(unloadInfo)
  }

  get() {
    return sessionStorage.unloadInfo ? JSON.parse(sessionStorage.unloadInfo) : new UnloadInfo();
  }

  clear() {
    delete sessionStorage.unloadInfo;
  }
}
