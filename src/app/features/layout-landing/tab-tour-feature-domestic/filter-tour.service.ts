import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, map } from 'rxjs';
import { FeatureResDTO } from '../../../../interface';

@Injectable({
  providedIn: 'root',
})
export class FilterTourService {
  http = inject(HttpClient);

  apiUrl = environment.API_URL + '/tour-trans/filter?';

  getTours(filters: {
    destination?: string;
    departure?: string;
    min?: number;
    max?: number;
  }): Observable<FeatureResDTO[]> {
    let params = new HttpParams();
    if (filters.destination) {
      params = params.set('startingPointId', filters.destination);
    }
    if (filters.departure) {
      params = params.set('locationId', filters.departure);
    }
    if (filters.min !== undefined) {
      params = params.set('min', filters.min.toString());
    }
    if (filters.max !== undefined) {
      params = params.set('max', filters.max.toString());
    }

    return this.http
      .get<{ data: { content: FeatureResDTO[] } }>(this.apiUrl, { params })
      .pipe(
        map(res => res.data.content) // Chỉ lấy mảng content
      );
  }
}
