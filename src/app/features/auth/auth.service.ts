import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { environment } from '../../../environment';

interface IUserReqDTO {
  username: string;
  password: string;
}

interface ILoginResDTO {
  token: string;
  role: string;
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private userKey = 'user_info';
  private avatarKey = 'user_avatar';
  private readonly url = environment.API_URL_AUTH;

  httpClient = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  private access_token = signal<string | null>(
    localStorage.getItem(this.accessTokenKey)
  );
  userName = signal<string | null>(localStorage.getItem(this.userKey));
  isAuthenticated = computed(() => !!this.access_token());

  avatar = signal<string | null>(localStorage.getItem(this.avatarKey) ?? null);

  login(userData: IUserReqDTO) {
    return this.httpClient
      .post<ILoginResDTO>(this.url + '/login', userData)
      .pipe(
        switchMap(res => {
          const [accessToken, user] = [res?.token ?? '', res?.userName ?? ''];
          localStorage.setItem(this.accessTokenKey, accessToken);
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.access_token.set(accessToken);
          this.userName.set(user);
          // if (this.user()?.username !== 'admin') {
          //   this.getAvatar();
          // }
          return of(true);
        })
      );
  }

  logout(returnUrl?: string): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userKey);
    this.access_token.set(null);
    this.avatar.set(null);
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: returnUrl },
    });
  }

  // getAvatar() {
  //   this.httpClient
  //     .get<ResponseBase<string>>(environment.apiUrl + '/employee/avatar')
  //     .subscribe({
  //       next: res => {
  //         if (res.data) {
  //           this.avatar.set(res.data);
  //           localStorage.setItem(this.avatarKey, res.data);
  //         }
  //       },
  //     });
  // }
}
