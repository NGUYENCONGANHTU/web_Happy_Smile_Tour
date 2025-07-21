import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _locale = 'vi';

  constructor() {
    this._locale = localStorage.getItem('lang') ?? 'vi';
  }

  get locale(): string {
    return this._locale;
  }

  setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this._locale = lang;
  }
}
