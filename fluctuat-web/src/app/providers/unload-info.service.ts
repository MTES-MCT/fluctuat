import { Injectable } from '@angular/core';
import { UnloadInfo } from '../shared/model/unload-info.model';

@Injectable()
export class UnloadInfoService {

  save(unloadInfo: UnloadInfo) {
    localStorage.unloadInfo = JSON.stringify(unloadInfo)
  }

  get() {
    return localStorage.unloadInfo ? JSON.parse(localStorage.unloadInfo) : new UnloadInfo();
  }
}
