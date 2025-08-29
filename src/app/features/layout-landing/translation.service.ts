import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { LanguageService } from '../../shared/services/language.service';

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
  | 'footer'
  | 'chatbox';

// Interface chính cho response
export interface TranslationResponse {
  data: Record<TranslationSection, Record<string, string>>;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  http = inject(HttpClient);
  // service language
  languageService = inject(LanguageService);
  // api
  apiTranslations = environment.API_URL + '/menu-trans';

  getDataTransLate() {
    return this.http.get<TranslationResponse>(
      this.apiTranslations + `/map/all?langCode=${this.languageService.locale}`
    );
  }
}
