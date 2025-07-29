import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { ResponseBaseList } from '../../core/interfaces/base.interface';
import { LanguageResDTO } from '../interfaces/shared-data.interface';

interface ISharedData {
  languageOptions: { label: string; value: any }[];
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private sharedDataSubject = new BehaviorSubject<ISharedData>({
    languageOptions: [],
  });
  private readonly apiUrl = `${environment.API_URL}`;
  private readonly apiList = {
    languageOptions: this.fetchLanguageOptions(),
  };

  constructor(private readonly http: HttpClient) {
    try {
      const sharedData =
        JSON.parse(localStorage.getItem('sharedData') as string) ?? [];
      this.sharedDataSubject.next(sharedData);
    } catch (e) {
      console.log(e);
    }
    this.fetchAllData();
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
  fetchLanguageOptions(): Observable<{ label: string; value: any }[]> {
    return this.http
      .get<ResponseBaseList<LanguageResDTO>>(`${this.apiUrl}/language`)
      .pipe(
        map(res => {
          return (
            res?.data?.map(dt => ({ label: dt?.name, value: dt?.code })) ?? []
          );
        }),
        catchError(() => of([]))
      );
  }
}
