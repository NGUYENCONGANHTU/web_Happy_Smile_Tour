import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environment';
import { LanguageResDTO } from '../../../../../shared/interfaces/shared-data.interface';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';
import { CONTENT_TYPE } from '../../../../../shared/constants/global.constant';

export interface ContentResDTO {
  id: number;
  menuId: number;
  language: LanguageResDTO;
  key: string;
  value: string;
  active: boolean;
  menuType: CONTENT_TYPE;
  created: boolean;
}

export interface ContentReqDTO {
  key: string;
  value: string;
  active: boolean;
  menuType: CONTENT_TYPE;
}

export interface ContentTransReqDTO {
  menuId: number;
  value: string;
  languageCode: string;
}

@Injectable({ providedIn: 'root' })
export class ContentConfigService {
  httpClient = inject(HttpClient);

  apiUrl = environment.API_URL + '/menu';
  apiUrlTrans = environment.API_URL + '/menu-trans';

  getContentData() {
    return this.httpClient.get(this.apiUrl);
  }

  createContent(data: ContentReqDTO) {
    return this.httpClient.post(this.apiUrl, data);
  }

  updateContentById(id: number | string, data: ContentReqDTO) {
    return this.httpClient.put(this.apiUrl + '/' + id, data);
  }

  deleteContentById(id: number | string) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  getContentDataTrans(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<ContentResDTO>>(
      this.apiUrlTrans,
      { params }
    );
  }

  createContentTrans(data: ContentTransReqDTO) {
    return this.httpClient.post(this.apiUrlTrans, data);
  }

  updateContentTransById(id: number | string, data: ContentTransReqDTO) {
    return this.httpClient.put(this.apiUrlTrans + '/' + id, data);
  }
}
