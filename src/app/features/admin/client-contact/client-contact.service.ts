import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { ResponseBaseList } from '../../../core/interfaces/base.interface';
import { ClientContactResDTO } from './client-contact.interface';

@Injectable({ providedIn: 'root' })
export class ClientContactService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/tour-contact`;

  getClientContacts() {
    return this.httpClient.get<ResponseBaseList<ClientContactResDTO>>(
      this.apiUrl
    );
  }
}
