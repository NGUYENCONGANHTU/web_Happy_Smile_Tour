import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environment';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';
import {
  AdvertisementReqDTO,
  AdvertisementResDTO,
  AdvertisementTransReqDTO,
  IntroReqDTO,
  IntroResDTO,
  IntroTitleReqDTO,
  IntroTitleResDTO,
  IntroTitleTransReqDTO,
  IntroTransReqDTO,
} from './intro-config.interface';

@Injectable({ providedIn: 'root' })
export class IntroConfigService {
  httpClient = inject(HttpClient);

  apiUrlIntro = `${environment.API_URL}/intro`;
  apiUrlIntroTrans = `${environment.API_URL}/intro-trans`;
  apiUrlIntroTitle = `${environment.API_URL}/intro-title`;
  apiUrlIntroTitleTrans = `${environment.API_URL}/intro-title-trans`;
  apiUrlAdvertisement = `${environment.API_URL}/advertise`;
  apiUrlAdvertisementTrans = `${environment.API_URL}/advertise-trans`;
  apiUrlStatistic = `${environment.API_URL}/statistics`;

  getIntroDataTrans(langCode: string, type: 'MAIN' | 'INTRO' | 'STATISTICAL') {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<IntroResDTO>>(
      this.apiUrlIntroTrans + `/type/${type}`,
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

  getIntroTitlesTrans(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<IntroTitleResDTO>>(
      this.apiUrlIntroTitleTrans + '/all',
      { params }
    );
  }

  updateIntroTitleById(id: string | number, data: IntroTitleReqDTO) {
    return this.httpClient.put(`${this.apiUrlIntroTitle}/${id}`, data);
  }

  createIntroTitleTrans(data: IntroTitleTransReqDTO) {
    return this.httpClient.post(this.apiUrlIntroTitleTrans, data);
  }

  updateIntroTitleTransById(id: string | number, data: IntroTitleTransReqDTO) {
    return this.httpClient.put(`${this.apiUrlIntroTitleTrans}/${id}`, data);
  }

  getAdvertisementsTrans(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<AdvertisementResDTO>>(
      this.apiUrlAdvertisementTrans + '/all',
      { params }
    );
  }

  createAdvertisement(data: AdvertisementReqDTO) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return this.httpClient.post(this.apiUrlAdvertisement, data);
  }

  updateAdvertisementById(id: string | number, data: AdvertisementReqDTO) {
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
    return this.httpClient.put(this.apiUrlAdvertisement + '/' + id, formData);
  }

  createAdvertisementTrans(data: AdvertisementTransReqDTO) {
    return this.httpClient.post(this.apiUrlAdvertisementTrans, data);
  }

  updateAdvertisementTransById(
    id: string | number,
    data: AdvertisementTransReqDTO
  ) {
    return this.httpClient.put(this.apiUrlAdvertisementTrans + '/' + id, data);
  }
}
