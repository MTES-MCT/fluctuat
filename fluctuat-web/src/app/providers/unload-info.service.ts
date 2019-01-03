import { Injectable } from '@angular/core';
import { UnloadInfo } from '../shared/model/unload-info.model';

const KEY = 'unloadInfo';
const getKey = (id) => `${KEY}-${id}`;

@Injectable()
export class UnloadInfoService {

  save(id, unloadInfo: UnloadInfo) {
    sessionStorage.setItem(getKey(id), JSON.stringify(unloadInfo))
  }

  get(id) {
    return sessionStorage.getItem(getKey(id)) ? JSON.parse(sessionStorage.getItem(getKey(id))) : new UnloadInfo();
  }

  clear(id) {
    sessionStorage.removeItem(getKey(id));
  }
}
