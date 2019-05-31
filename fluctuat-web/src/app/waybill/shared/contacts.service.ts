import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from './models/contacts.model';

@Injectable()
export class ContactsService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Contacts> {
    return this.http.get<Contacts>('/api/contacts/me');
  }
}
