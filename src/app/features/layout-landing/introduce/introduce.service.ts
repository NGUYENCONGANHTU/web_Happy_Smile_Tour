import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { LanguageService } from '../../../shared/services/language.service';
import {
  AdvertiseReqDTO,
  AdvertiseResDTO,
  IntroducePageReqDTO,
  IntroducePageResDTO,
  IntroduceTitlePageReqDTO,
  IntroduceTitlePageResDTO,
} from './interface-introduce';

@Injectable({
  providedIn: 'root',
})
export class IntroduceService {
  http = inject(HttpClient);
  languageService = inject(LanguageService);
  apiUrl = environment.API_URL + '/intro-title-trans';
  apiUrl2 = environment.API_URL + '/intro-trans';
  apiAdvertise = environment.API_URL + '/advertise-trans';

  // ============ lấy tiêu đề trang giới thiệu ============
  getAllDataIntroduceTitle() {
    return this.http.get<{ data: IntroduceTitlePageResDTO[] }>(
      this.apiUrl + `/all?langCode=${this.languageService.locale}`
    );
  }
  createDataIntroduceTitle(data: IntroduceTitlePageReqDTO) {
    return this.http.post<IntroduceTitlePageResDTO>(this.apiUrl, data);
  }

  updateDataIntroduceTitle(data: IntroduceTitlePageReqDTO, id: number) {
    return this.http.put<IntroduceTitlePageResDTO>(
      `${this.apiUrl}/${id}`,
      data
    );
  }
  deleteDataIntroduceTitle(id: number) {
    return this.http.delete<IntroduceTitlePageResDTO>(`${this.apiUrl}/${id}`);
  }

  // ============ lấy nội dung cửa dịch vụ ============
  getAllDataAdvertise() {
    return this.http.get<{ data: AdvertiseResDTO[] }>(
      this.apiAdvertise + `/all?langCode=${this.languageService.locale}`
    );
  }
  createDataAdvertise(data: AdvertiseReqDTO) {
    return this.http.post<AdvertiseResDTO>(this.apiAdvertise, data);
  }

  updateDataAdvertise(data: AdvertiseReqDTO, id: number) {
    return this.http.put<AdvertiseResDTO>(`${this.apiAdvertise}/${id}`, data);
  }
  deleteDataAdvertise(id: number) {
    return this.http.delete<AdvertiseResDTO>(`${this.apiAdvertise}/${id}`);
  }

  // ============ Giới thiệu văn bản ============
  getAllDataIntroduceMain() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl2 + `/type/MAIN?langCode=${this.languageService.locale}`
    );
  }
  // lấy data của thông kê
  getAllDataIntroduceStatistical() {
    return this.http.get<{ data: IntroducePageResDTO[] }>(
      this.apiUrl2 + `/type/STATISTICAL?langCode=${this.languageService.locale}`
    );
  }
  createDataIntroduce(data: IntroducePageReqDTO) {
    return this.http.post<IntroducePageResDTO>(this.apiUrl2, data);
  }

  updateDataIntroduce(data: IntroducePageReqDTO, id: number) {
    return this.http.put<IntroducePageResDTO>(`${this.apiUrl2}/${id}`, data);
  }
  deleteDataIntroduce(id: number) {
    return this.http.delete<IntroducePageResDTO>(`${this.apiUrl2}/${id}`);
  }
}
