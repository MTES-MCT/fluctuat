import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Contract } from './contract';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {
  }

  create(contract) {
    return this.http.post('/api/contract', contract)
  }

  getAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>('/api/contract')
  }

  get(id) {
    return this.http.get<Contract>(`/api/contract/${id}`)
  }

  accept(id) {
    return this.http.post(`/api/contract/${id}/accept`)
  }
}
