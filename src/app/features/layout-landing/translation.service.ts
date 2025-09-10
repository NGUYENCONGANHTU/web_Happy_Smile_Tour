import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { LanguageService } from '../../shared/services/language.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export type TranslationSection =
  | 'base'
  | 'menu'
  | 'home'
  | 'about'
  | 'tab_domestic'
  | 'tab_foreign'
  | 'tab_customer_tour'
  | 'tab_service'
  | 'tab_contact'
  | 'tab_tour_detail'
  | 'tab_travel_detail'
  | 'footer'
  | 'chatbox';

export interface TranslationResponse {
  data: Record<TranslationSection, Record<string, string>>;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  http = inject(HttpClient);
  languageService = inject(LanguageService);
  apiTranslations = environment.API_URL + '/menu-trans';

  // cache dữ liệu theo langCode
  private cache: Record<string, Observable<TranslationResponse>> = {};
  private translationChanged$ = new BehaviorSubject<void>(undefined);
  getDataTransLate(): Observable<TranslationResponse> {
    const lang = this.languageService.locale;

    return this.translationChanged$.pipe(
      switchMap(() => {
        if (!this.cache[lang]) {
          this.cache[lang] = this.http
            .get<TranslationResponse>(
              `${this.apiTranslations}/map/all?langCode=${lang}`
            )
            .pipe(shareReplay(1));
        }
        return this.cache[lang];
      })
    );
  }

  // hàm reset cache khi đổi ngôn ngữ
  clearCache() {
    this.cache = {};
    this.translationChanged$.next();
  }
}
