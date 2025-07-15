import { environment } from '../../../../environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourResDTO,
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

  getTours() {
    return this.httpClient.get<ResponseBaseList<TourResDTO>>(this.apiUrlTour);
  }

  getTourById(id: string | number) {
    return this.httpClient.get<ResponseBase<TourResDTO>>(
      this.apiUrlTour + '/' + id
    );
  }

  getTourPricesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourPriceResDTO>>(
      this.apiUrlTourPrice + '/' + tourId
    );
  }

  getTourDiscountsByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourDiscountResDTO>>(
      this.apiUrlTourDiscount + '/' + tourId
    );
  }

  getTourSurchargesByTourId(tourId: string | number) {
    return this.httpClient.get<ResponseBaseList<TourSurchargeResDTO>>(
      this.apiUrlTourSurcharge + '/' + tourId
    );
  }
}
