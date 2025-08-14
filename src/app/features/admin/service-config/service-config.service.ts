import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';
import {
  ResponseBase,
  ResponseBaseList,
} from '../../../core/interfaces/base.interface';
import {
  VisaProcessReqDTO,
  VisaProcessResDTO,
  VisaServiceReqDTO,
  VisaServiceResDTO,
} from './service-config.interfaces';
import {
  VisaProcessTransReqDTO,
  VisaServiceTransReqDTO,
} from './service-config.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServiceConfigService {
  httpClient = inject(HttpClient);

  apiUrlVisaService = `${environment.API_URL}/visa-service`;
  apiUrlVisaServiceTrans = `${environment.API_URL}/visa-service-trans`;
  apiUrlVisaProcess = `${environment.API_URL}/visa-process`;
  apiUrlVisaProcessTrans = `${environment.API_URL}/visa-process-trans`;

  getServices() {
    return this.httpClient.get<ResponseBaseList<VisaServiceResDTO>>(
      this.apiUrlVisaService
    );
  }

  getServiceById(id: number | string) {
    return this.httpClient.get<ResponseBase<VisaServiceResDTO>>(
      this.apiUrlVisaService + '/' + id
    );
  }

  createService(data: VisaServiceReqDTO) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return this.httpClient.post<ResponseBase<VisaServiceResDTO>>(
      this.apiUrlVisaService,
      formData
    );
  }

  updateServiceById(id: string | number, data: VisaServiceReqDTO) {
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
    return this.httpClient.put(this.apiUrlVisaService + '/' + id, formData);
  }

  deleteService(id: string | number) {
    return this.httpClient.delete(this.apiUrlVisaService + '/' + id);
  }

  getServicesTransByLangCode(langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get(this.apiUrlVisaServiceTrans + '/all', {
      params,
    });
  }

  createServiceTrans(data: VisaServiceTransReqDTO) {
    return this.httpClient.post(this.apiUrlVisaServiceTrans, data);
  }

  updateServiceTransById(id: string | number, data: VisaServiceTransReqDTO) {
    return this.httpClient.put(this.apiUrlVisaServiceTrans + '/' + id, data);
  }

  getServiceTransById(id: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBase<VisaServiceResDTO>>(
      this.apiUrlVisaServiceTrans + '/service/' + id,
      { params }
    );
  }

  getVisaProcessTransByVisaServiceId(id: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<VisaProcessResDTO>>(
      this.apiUrlVisaProcessTrans + '/visaServiceId/' + id,
      { params }
    );
  }

  modifyVisaProcess(data: VisaProcessReqDTO[]) {
    return this.httpClient.post(this.apiUrlVisaProcess, data);
  }

  modifyVisaProcessTrans(data: VisaProcessTransReqDTO[]) {
    return this.httpClient.post(this.apiUrlVisaProcessTrans, data);
  }
}
