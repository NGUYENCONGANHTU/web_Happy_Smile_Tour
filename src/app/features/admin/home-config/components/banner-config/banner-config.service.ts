import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environment';
import { BannerReqDTO, BannerResDTO } from '../../../../../../interface';
import {
  ResponseBase,
  ResponseBaseList,
} from '../../../../../core/interfaces/base.interface';

@Injectable({ providedIn: 'root' })
export class BannerConfigService {
  httpClient = inject(HttpClient);

  apiUrlBanner = environment.API_URL + '/banner';
  apiUrlBannerTrans = environment.API_URL + '/banner-trans';

  getBannerByType(type: 'HOME' | 'INTRO' | 'CONTACT') {
    return this.httpClient.get<ResponseBase<BannerResDTO>>(
      `${this.apiUrlBanner}/${type}`
    );
  }

  updateBannerById(id: string | number, data: BannerReqDTO) {
    const formData = new FormData();
    // Đưa các field đơn giản vào FormData
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          if (key === 'images') {
            if (v?.id) {
              formData.append('idsFile', v.id);
            } else {
              formData.append(key, v);
            }
          } else {
            formData.append(key, v);
          }
        });
      } else {
        formData.append(key, value);
      }
    });
    return this.httpClient.put(`${this.apiUrlBanner}/${id}`, formData);
  }

  updateBannerTransById(id: string | number, data: BannerReqDTO) {
    return this.httpClient.put(`${this.apiUrlBannerTrans}/${id}`, data);
  }

  getBannerTransByType(type: 'HOME' | 'INTRO' | 'CONTACT', langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<BannerResDTO>>(
      `${this.apiUrlBannerTrans}/type/${type}`,
      { params }
    );
  }

  createBannerTrans(data: BannerReqDTO) {
    return this.httpClient.post(`${this.apiUrlBannerTrans}`, data);
  }
}
