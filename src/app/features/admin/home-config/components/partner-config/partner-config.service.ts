import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environment';
import { ResponseBaseList } from '../../../../../core/interfaces/base.interface';
import { PartnerResDTO } from './partner-config.interface';

@Injectable({ providedIn: 'root' })
export class PartnerConfigService {
  httpClient = inject(HttpClient);

  apiUrl = `${environment.API_URL}/partner`;

  getPartners() {
    return this.httpClient.get<ResponseBaseList<PartnerResDTO>>(this.apiUrl);
  }

  updatePartners(formData: FormData) {
    return this.httpClient.post(this.apiUrl, formData);
  }
}
