import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environment';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';
import {
  IntroReqDTO,
  IntroResDTO,
  IntroTransReqDTO,
} from './intro-config.interface';

@Injectable({ providedIn: 'root' })
export class IntroConfigService {
  httpClient = inject(HttpClient);

  apiUrlIntro = `${environment.API_URL}/intro`;
  apiUrlIntroTrans = `${environment.API_URL}/intro-trans`;

  getIntroDataTrans(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<IntroResDTO>>(
      this.apiUrlIntroTrans + '/type/MAIN',
      { params }
    );
  }

  updateIntroDataById(id: string | number, data: IntroReqDTO) {
    return this.httpClient.put(`${this.apiUrlIntro}/${id}`, data);
  }

  updateIntroTransById(id: string | number, data: IntroTransReqDTO) {
    return this.httpClient.put(`${this.apiUrlIntroTrans}/${id}`, data);
  }

  createIntroTransByLangCode(data: IntroTransReqDTO) {
    return this.httpClient.post(this.apiUrlIntroTrans, data);
  }
}
