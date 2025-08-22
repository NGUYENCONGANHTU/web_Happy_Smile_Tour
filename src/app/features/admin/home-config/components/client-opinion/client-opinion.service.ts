import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ClientOpinionReqDTO,
  ClientOpinionResDTO,
} from './client-opinion.interface';
import { environment } from '../../../../../../environment';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientOpinionService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/home-comment`;

  getClientOpinions() {
    return this.httpClient.get<ResponseBaseList<ClientOpinionResDTO>>(
      this.apiUrl
    );
  }

  createClientOpinion(data: ClientOpinionReqDTO) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return this.httpClient.post(this.apiUrl, formData);
  }

  updateClientOpinionById(id: string | number, data: ClientOpinionReqDTO) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === 'image') {
          if (value?.id) {
            formData.append('idsFile', value.id);
          } else {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      }
    });
    return this.httpClient.put(this.apiUrl + '/' + id, formData);
  }

  deleteClientOpinionById(id: string | number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
