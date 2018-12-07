import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {
  }

  create(contract) {
    return this.http.post('/api/contract', contract, { observe: 'response' })
      .pipe(map(response => response.headers.get('Location')));
  }
}
