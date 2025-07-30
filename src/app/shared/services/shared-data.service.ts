import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environment';
import { ResponseBaseList } from '../../core/interfaces/base.interface';
import { LanguageResDTO } from '../interfaces/shared-data.interface';
import { HttpClient } from '@angular/common/http';

interface ISharedData {
  languageOptions: LanguageResDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private sharedDataSubject = new BehaviorSubject<ISharedData>({
    languageOptions: [],
  });
  private readonly apiUrl = `${environment.API_URL}`;
  private apiList;

  constructor(private http: HttpClient) {
    this.apiList = {
      languageOptions: this.fetchLanguageOptions(),
    };
    try {
      const sharedData =
        JSON.parse(localStorage.getItem('sharedData') as string) ?? [];
      this.sharedDataSubject.next(sharedData);
    } catch (e) {
      console.log(e);
    }
    this.fetchAllData().subscribe();
  }

  // Fetch all data in parallel
  fetchAllData() {
    return forkJoin(this.apiList).pipe(
      tap(data => {
        this.sharedDataSubject.next({
          ...this.sharedDataSubject.getValue(),
          ...data,
        });
        try {
          localStorage.setItem(
            'sharedData',
            JSON.stringify(this.sharedDataSubject.getValue())
          );
        } catch (e) {
          console.log(e);
        }
      })
    );
  }

  // Fetch data
  fetchData(key: keyof ISharedData) {
    switch (key) {
      case 'languageOptions':
        this.fetchLanguageOptions().subscribe(res => {
          this.sharedDataSubject.next({
            ...this.sharedDataSubject.getValue(),
            languageOptions: res,
          });
          try {
            localStorage.setItem(
              'sharedData',
              JSON.stringify(this.sharedDataSubject.getValue())
            );
          } catch (e) {
            console.log(e);
          }
        });
        break;
      default:
    }
  }

  // Get data
  getLanguageOptions() {
    return this.sharedDataSubject.getValue().languageOptions ?? [];
  }

  // Language
  fetchLanguageOptions() {
    return this.http
      .get<ResponseBaseList<LanguageResDTO>>(`${this.apiUrl}/language`)
      .pipe(
        map(res => {
          return res?.data ?? [];
        }),
        catchError(() => of([]))
      );
  }
}
