import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
import {
  TourDiscountReqDTO,
  TourDiscountResDTO,
  TourPriceReqDTO,
  TourPriceResDTO,
  TourSurchargeReqDTO,
  TourSurchargeResDTO,
} from './interface-tour-price';
@Injectable({
  providedIn: 'root',
})
export class TourPriceListService {
  http = inject(HttpClient);
  apiTourDiscountUrl = environment.API_URL + '/tour-discount';
  apiTourPriceUrl = environment.API_URL + '/tour-price';
  apiTourSurchargeUrl = environment.API_URL + '/tour-surcharge';

  /*======================== BẢNG GIẢM GIÁ ==========================*/
  createDataTourDiscount(data: TourDiscountReqDTO) {
    return this.http.post<TourDiscountResDTO>(this.apiTourDiscountUrl, data);
  }

  getAlLDataTourDiscount() {
    return this.http.get<TourDiscountResDTO[]>(this.apiTourDiscountUrl);
  }

  getDataByIdTourDiscount(id: number) {
    return this.http.get<TourDiscountResDTO>(
      `${this.apiTourDiscountUrl}/${id}`
    );
  }

  updateDataTourDiscount(data: TourDiscountReqDTO, id: number) {
    return this.http.put<TourDiscountResDTO>(
      `${this.apiTourDiscountUrl}/${id}`,
      data
    );
  }
  deleteDataTourDiscount(id: number) {
    return this.http.delete<TourDiscountResDTO>(
      `${this.apiTourDiscountUrl}/${id}`
    );
  }

  /*======================== BẢNG GIÁ ==========================*/
  createDataTourPrice(data: TourPriceReqDTO) {
    return this.http.post<TourPriceResDTO>(this.apiTourPriceUrl, data);
  }

  getAlLDataTourPrice() {
    return this.http.get<TourPriceResDTO[]>(this.apiTourPriceUrl);
  }

  getDataByIdTourPrice(id: number) {
    return this.http.get<TourPriceResDTO>(`${this.apiTourPriceUrl}/${id}`);
  }

  updateDataTourPrice(data: TourPriceReqDTO, id: number) {
    return this.http.put<TourPriceResDTO>(
      `${this.apiTourPriceUrl}/${id}`,
      data
    );
  }
  deleteDataTourPrice(id: number) {
    return this.http.delete<TourPriceResDTO>(`${this.apiTourPriceUrl}/${id}`);
  }

  /*======================== BẢNG PHỤ THU ==========================*/
  createDataTourSurcharge(data: TourSurchargeReqDTO) {
    return this.http.post<TourSurchargeResDTO>(this.apiTourSurchargeUrl, data);
  }

  getAlLDataTourSurcharge() {
    return this.http.get<TourSurchargeResDTO[]>(this.apiTourSurchargeUrl);
  }

  getDataByIdTourSurcharge(id: number) {
    return this.http.get<TourSurchargeResDTO>(
      `${this.apiTourSurchargeUrl}/${id}`
    );
  }

  updateDataTourSurcharge(data: TourSurchargeReqDTO, id: number) {
    return this.http.put<TourSurchargeResDTO>(
      `${this.apiTourSurchargeUrl}/${id}`,
      data
    );
  }
  deleteDataTourSurcharge(id: number) {
    return this.http.delete<TourSurchargeResDTO>(
      `${this.apiTourSurchargeUrl}/${id}`
    );
  }
}
