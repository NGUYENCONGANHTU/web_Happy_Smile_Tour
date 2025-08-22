import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { ResponseBaseList } from '../../../core/interfaces/base.interface';
import { ClientCommentResDTO } from './client-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientCommentService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/tour-comment`;

  getClientComments() {
    return this.httpClient.get<ResponseBaseList<ClientCommentResDTO>>(
      this.apiUrl
    );
  }

  deleteClientCommentById(id: string | number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
