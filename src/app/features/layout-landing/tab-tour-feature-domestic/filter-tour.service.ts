import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';
import { map, Observable } from 'rxjs';
import { FeatureResDTO } from '../../../../interface';
import { LanguageService } from '../../../shared/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class FilterTourService {
  http = inject(HttpClient);
  languageService = inject(LanguageService);
  apiUrl = environment.API_URL + '/tour-trans/filter';

  getTours(filters: {
    destination?: string;
    departure?: string;
    min?: number;
    max?: number;
    page?: number;
    size?: number;
  }): Observable<FeatureResDTO[]> {
    let params = new HttpParams();
    if (filters.departure) {
      params = params.set('startingPointId', filters.departure);
    }
    if (filters.destination) {
      params = params.set('locationId', filters.destination);
    }
    if (filters.min !== undefined) {
      params = params.set('min', filters.min.toString());
    }
    if (filters.max !== undefined) {
      params = params.set('max', filters.max.toString());
    }
    params = params.set('langCode', this.languageService.locale);

    return this.http
      .get<{ data: { content: FeatureResDTO[] } }>(this.apiUrl, { params })
      .pipe(map(res => res.data.content));
  }

  filterTours(params: any): Observable<any> {
    const queryParams = new URLSearchParams();

    // 1. Add all params except langCode
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (
        key !== 'langCode' &&
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        queryParams.append(key, value);
      }
    });

    // 2. Add langCode (from LanguageService) at the end
    const langCode = this.languageService.locale || 'vi';
    queryParams.append('langCode', langCode);

    // 3. Final URL
    const fullUrl = `${this.apiUrl}?${queryParams.toString()}`;

    return this.http.get<any>(fullUrl);
  }
}
