import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import {
  FileResDTO,
  ResponseBase,
  ResponseBaseList,
} from '../../../core/interfaces/base.interface';

export interface LanguageResDTO {
  id: number;
  name: string;
  code: string;
  image: FileResDTO;
}

export interface LanguageReqDTO {
  name: string;
  code: string;
  image: File;
  idsFile?: number[];
}

@Injectable({ providedIn: 'root' })
export class LanguageConfigService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/language`;

  getLanguages() {
    return this.httpClient.get<ResponseBaseList<LanguageResDTO>>(this.apiUrl);
  }

  getLanguageById(id: number) {
    return this.httpClient.get<ResponseBase<LanguageResDTO>>(
      `${this.apiUrl}/${id}`
    );
  }

  createLanguage(data: LanguageReqDTO) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return this.httpClient.post<ResponseBase<LanguageResDTO>>(
      this.apiUrl,
      formData
    );
  }

  updateLanguage(data: LanguageReqDTO) {
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
    return this.httpClient.post<ResponseBase<LanguageResDTO>>(
      this.apiUrl,
      formData
    );
  }

  deleteLanguageById(id: string | number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
