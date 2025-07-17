import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import {
  TourServiceReqDTO,
  TourServiceResDTO,
} from './interface-contact-tour-service';

@Injectable({
  providedIn: 'root',
})
export class TabServiceService {
  http = inject(HttpClient);
  // Trang chủ: biểu ngữ
  apiUrlTourService = environment.API_URL + '/service-contact';

  createDataTourService(data: TourServiceReqDTO) {
    return this.http.post<TourServiceResDTO>(this.apiUrlTourService, data);
  }
  getAllDataTourService() {
    return this.http.get<TourServiceResDTO[]>(
      this.apiUrlTourService + '/all?langCode='
    );
  }
  getDataByIdTourService(id: number) {
    return this.http.get<TourServiceResDTO>(
      `${this.apiUrlTourService}/service/${id}?langCode=`
    );
  }

  updateDataTourService(data: TourServiceReqDTO, id: number) {
    return this.http.put<TourServiceResDTO>(
      `${this.apiUrlTourService}/${id}`,
      data
    );
  }
  deleteDataTourService(id: number) {
    return this.http.delete<TourServiceResDTO>(
      `${this.apiUrlTourService}/${id}`
    );
  }
}
