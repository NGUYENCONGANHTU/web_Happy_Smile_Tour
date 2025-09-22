import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { environment } from '../../../environment';

interface IUserReqDTO {
  username: string;
  password: string;
}

interface ILoginResDTO {
  role: string;
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user_info';
  private avatarKey = 'user_avatar';
  private readonly url = environment.API_URL_AUTH;

  httpClient = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  userName = signal<string | null>(localStorage.getItem(this.userKey));
  isAuthenticated = signal<boolean>(false); // dựa trên cookie session

  avatar = signal<string | null>(localStorage.getItem(this.avatarKey) ?? null);

  login(userData: IUserReqDTO) {
    return this.httpClient
      .post<ILoginResDTO>(this.url + '/login', userData)
      .pipe(
        switchMap(res => {
          const user = res?.userName ?? '';
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.userName.set(user);
          this.isAuthenticated.set(true);
          return of(true);
        })
      );
  }

  logout(returnUrl?: string): void {
    this.httpClient
      .post(this.url + '/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem(this.userKey);
          this.userName.set(null);
          this.avatar.set(null);
          this.isAuthenticated.set(false);
          this.router.navigate(['/auth'], {
            queryParams: { returnUrl: returnUrl },
          });
        },
      });
  }
}
