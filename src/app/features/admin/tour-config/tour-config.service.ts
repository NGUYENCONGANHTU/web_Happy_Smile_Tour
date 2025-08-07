import { environment } from '../../../../environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  apiUrlTourTrans = environment.API_URL + '/tour-trans';
  apiUrlTourPrice = environment.API_URL + '/tour-price';
  apiUrlTourPriceTrans = environment.API_URL + '/tour-price-trans';
  apiUrlTourDiscount = environment.API_URL + '/tour-discount';
  apiUrlTourDiscountTrans = environment.API_URL + '/tour-discount-trans';
  apiUrlTourSurcharge = environment.API_URL + '/tour-surcharge';
  apiUrlTourSurchargeTrans = environment.API_URL + '/tour-surcharge-trans';
  apiUrlSchedule = environment.API_URL + '/tour-schedule';
  apiUrlScheduleTrans = environment.API_URL + '/tour-schedule-trans';
  apiUrlLocation = environment.API_URL + '/location';

  getTours() {
    return this.httpClient.get<ResponseBaseList<TourResDTO>>(this.apiUrlTour);
  }

  getTourById(id: string | number) {
    return this.httpClient.get<ResponseBase<TourResDTO>>(
      this.apiUrlTour + '/' + id
    );
  }

  getTourTransById(id: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBase<TourResDTO>>(
      this.apiUrlTourTrans + '/service/' + id,
      { params }
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

  createTourTrans(formData: FormData) {
    return this.httpClient.post<TourResDTO>(this.apiUrlTourTrans, formData);
  }

  updateTourTransById(id: string | number, formData: FormData) {
    return this.httpClient.put<TourResDTO>(
      this.apiUrlTourTrans + '/' + id,
      formData
    );
  }

  getTourPricesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourPriceResDTO>>(
      this.apiUrlTourPrice + '/tourId/' + tourId
    );
  }

  getTourPricesTransByTourId(tourId: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<TourPriceResDTO>>(
      this.apiUrlTourPriceTrans + '/tourId/' + tourId,
      { params }
    );
  }

  createTourPrices(data: TourPriceReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourPrice, data);
  }

  createTourPricesTrans(data: TourPriceReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourPriceTrans, data);
  }

  updateTourPrices(data: TourPriceReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourPrice, data);
  }

  updateTourPricesTrans(data: TourPriceReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourPriceTrans, data);
  }

  getTourDiscountsByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourDiscountResDTO>>(
      this.apiUrlTourDiscount + '/tourId/' + tourId
    );
  }

  getTourDiscountsTransByTourId(tourId: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<TourDiscountResDTO>>(
      this.apiUrlTourDiscountTrans + '/tourId/' + tourId,
      { params }
    );
  }

  createTourDiscounts(data: TourDiscountReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourDiscount, data);
  }

  createTourDiscountTrans(data: TourDiscountReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourDiscountTrans, data);
  }

  updateTourDiscounts(data: TourDiscountReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourDiscount, data);
  }

  updateTourDiscountsTrans(data: TourDiscountReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourDiscountTrans, data);
  }

  getTourSurchargesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourSurchargeResDTO>>(
      this.apiUrlTourSurcharge + '/tourId/' + tourId
    );
  }

  getTourSurchargesTransByTourId(tourId: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<TourSurchargeResDTO>>(
      this.apiUrlTourSurchargeTrans + '/tourId/' + tourId,
      { params }
    );
  }

  createTourSurcharges(data: TourSurchargeReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourSurcharge, data);
  }

  createTourSurchargeTrans(data: TourSurchargeReqDTO[]) {
    return this.httpClient.post(this.apiUrlTourSurchargeTrans, data);
  }

  updateTourSurcharges(data: TourSurchargeReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourSurcharge, data);
  }

  updateTourSurchargesTrans(data: TourSurchargeReqDTO[]) {
    return this.httpClient.put(this.apiUrlTourSurchargeTrans, data);
  }

  getTourSchedulesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourScheduleResDTO>>(
      this.apiUrlSchedule + '/tourId/' + tourId
    );
  }

  getTourSchedulesTransByTourId(tourId: string | number, langCode: string) {
    const params = new HttpParams().set('langCode', langCode);
    return this.httpClient.get<ResponseBaseList<TourScheduleResDTO>>(
      this.apiUrlScheduleTrans + '/tourId/' + tourId,
      { params }
    );
  }

  createTourSchedules(data: TourScheduleReqDTO[]) {
    return this.httpClient.post(this.apiUrlSchedule, data);
  }

  createTourScheduleTrans(data: TourScheduleReqDTO[]) {
    return this.httpClient.post(this.apiUrlScheduleTrans, data);
  }

  updateTourSchedules(data: TourScheduleReqDTO[]) {
    return this.httpClient.put(this.apiUrlSchedule, data);
  }

  updateTourSchedulesTrans(data: TourScheduleReqDTO[]) {
    return this.httpClient.put(this.apiUrlScheduleTrans, data);
  }

  getLocations() {
    return this.httpClient.get<ResponseBaseList<LocationResDTO>>(
      this.apiUrlLocation
    );
  }

  deleteTourById(id: string | number) {
    return this.httpClient.delete(this.apiUrlTour + `/${id}`);
  }
}
