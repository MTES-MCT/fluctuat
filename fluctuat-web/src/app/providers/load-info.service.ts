import { Injectable } from '@angular/core';
import { LoadInfo } from '../shared/model/load-info.model';

const KEY = 'loadInfo';
const getKey = (id) => `${KEY}-${id}`;

@Injectable()
export class LoadInfoService {

  save(id, loadInfo: LoadInfo) {
    sessionStorage.setItem(getKey(id), JSON.stringify(loadInfo))
  }

  get(id) {
    return sessionStorage.getItem(getKey(id)) ? JSON.parse(sessionStorage.getItem(getKey(id))) : undefined;
  }

  clear(id) {
    sessionStorage.removeItem(getKey(id));
  }
}
