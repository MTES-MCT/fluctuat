import { Injectable } from '@angular/core';
import { UnloadInfo } from '../unload-info';

@Injectable()
export class UnloadInfoService {

  save(unloadInfo: UnloadInfo) {
    localStorage.unloadInfo = JSON.stringify(unloadInfo)
  }

  get() {
    return localStorage.unloadInfo ? JSON.parse(localStorage.unloadInfo) : new UnloadInfo();
  }
}
