import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKey } from './api-key.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiKeyService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiKey[]> {
    return this.http.get<ApiKey[]>('/api/api-key');
  }

  create(apiKey): Observable<ApiKey> {
    return this.http.post<ApiKey>('/api/api-key', apiKey);
  }

  deleteApiKey(id): Observable<any> {
    return this.http.delete(`/api/api-key/${id}`);
  }
}
