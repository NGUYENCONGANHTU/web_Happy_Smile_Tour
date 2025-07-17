import { environment } from '../../../../environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LocationResDTO,
  TourDiscountReqDTO,
  TourDiscountResDTO,
  TourPriceReqDTO,
  TourPriceResDTO,
  TourResDTO,
  TourScheduleReqDTO,
  TourScheduleResDTO,
  TourSurchargeReqDTO,
  TourSurchargeResDTO,
} from './interface';
import {
  ResponseBase,
  ResponseBaseList,
} from '../../../core/interfaces/base.interface';

@Injectable({ providedIn: 'root' })
export class TourConfigService {
  httpClient = inject(HttpClient);

  apiUrlTour = environment.API_URL + '/tour';
  apiUrlTourPrice = environment.API_URL + '/tour-price';
  apiUrlTourDiscount = environment.API_URL + '/tour-discount';
  apiUrlTourSurcharge = environment.API_URL + '/tour-surcharge';
  apiUrlSchedule = environment.API_URL + '/tour-schedule';
  apiUrlLocation = environment.API_URL + '/location';

  getTours() {
    return this.httpClient.get<ResponseBaseList<TourResDTO>>(this.apiUrlTour);
  }

  getTourById(id: string | number) {
    return this.httpClient.get<ResponseBase<TourResDTO>>(
      this.apiUrlTour + '/' + id
    );
  }

  createTour(formData: FormData) {
    return this.httpClient.post<TourResDTO>(this.apiUrlTour, formData);
  }

  updateTourById(id: string | number, formData: FormData) {
    return this.httpClient.put<TourResDTO>(
      this.apiUrlTour + '/' + id,
      formData
    );
  }

  getTourPricesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourPriceResDTO>>(
      this.apiUrlTourPrice + '/tourId/' + tourId
    );
  }

  createTourPrices(data: TourPriceReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourPrice, data);
  }

  updateTourPrices(data: TourPriceReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourPrice, data);
  }

  getTourDiscountsByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourDiscountResDTO>>(
      this.apiUrlTourDiscount + '/tourId/' + tourId
    );
  }

  createTourDiscounts(data: TourDiscountReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourDiscount, data);
  }

  updateTourDiscounts(data: TourDiscountReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourDiscount, data);
  }

  getTourSurchargesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourSurchargeResDTO>>(
      this.apiUrlTourSurcharge + '/tourId/' + tourId
    );
  }

  createTourSurcharges(data: TourSurchargeReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourSurcharge, data);
  }

  updateTourSurcharges(data: TourSurchargeReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourSurcharge, data);
  }

  getTourSchedulesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourScheduleResDTO>>(
      this.apiUrlSchedule + '/tourId/' + tourId
    );
  }

  createTourSchedules(data: TourScheduleReqDTO[]) {
    return this.httpClient.post(this.apiUrlSchedule, data);
  }

  updateTourSchedules(data: TourScheduleReqDTO[]) {
    return this.httpClient.put(this.apiUrlSchedule, data);
  }

  getLocations() {
    return this.httpClient.get<ResponseBaseList<LocationResDTO>>(
      this.apiUrlLocation
    );
  }
}
