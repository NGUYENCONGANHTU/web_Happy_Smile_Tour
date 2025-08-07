import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../shared/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class FilterTourService {
  http = inject(HttpClient);
  languageService = inject(LanguageService);
  apiUrl = environment.API_URL + '/tour-trans/filter';

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
