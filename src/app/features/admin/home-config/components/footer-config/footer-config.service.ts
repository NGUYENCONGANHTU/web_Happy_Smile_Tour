import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';
import { FooterReqDTO, FooterResDTO } from './footer-config.interface';

@Injectable({ providedIn: 'root' })
export class FooterConfigService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/footer`;
  apiUrlTrans = `${environment.API_URL}/footer-trans`;

  getFooterData() {
    return this.httpClient.get<ResponseBaseList<FooterResDTO>>(this.apiUrl);
  }

  getFooterTransData(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<FooterResDTO>>(
      this.apiUrlTrans + '/all',
      { params }
    );
  }

  updateFooterById(id: string | number, data: FooterReqDTO) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  updateFooterTransById(id: string | number, data: FooterReqDTO) {
    return this.httpClient.put(`${this.apiUrlTrans}/${id}`, data);
  }
}
