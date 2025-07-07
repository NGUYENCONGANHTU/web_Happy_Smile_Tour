import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ForgotPasswordReqDTO,
  PermissionServiceResDTO,
  SetPasswordReqDTO,
  UpdatePasswordReqDTO,
} from './auth.interface';
import { of, switchMap } from 'rxjs';
import { environment } from '../../../environment';
import { ResponseBase } from '../interfaces/base.interface';

interface IUserReqDTO {
  username: string;
  password: string;
}

interface IUserResDTO {
  code: string;
  fullName: string;
  username: string;
}

interface ILoginResDTO {
  access_token?: string;
  refresh_token?: string;
  user: IUserResDTO;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'user_info';
  private permissionKey = 'user_permissions';
  private menuPermissionKey = 'user_menu_permissions';
  private avatarKey = 'user_avatar';
  private readonly url = environment.API_URL;

  httpClient = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  private access_token = signal<string | null>(
    localStorage.getItem(this.accessTokenKey)
  );
  private refresh_token = signal<string | null>(
    localStorage.getItem(this.refreshTokenKey)
  );
  user = signal<IUserResDTO | null>(
    JSON.parse(localStorage.getItem(this.userKey) ?? '{}') as IUserResDTO | null
  );
  isAuthenticated = computed(() => !!this.access_token());
  private permissions = signal<Set<string>>(
    new Set(
      JSON.parse(localStorage.getItem(this.permissionKey) ?? '[]') as string[]
    )
  );
  private menuPermissions = signal<Set<string>>(
    new Set(
      JSON.parse(
        localStorage.getItem(this.menuPermissionKey) ?? '[]'
      ) as string[]
    )
  );

  avatar = signal<string | null>(localStorage.getItem(this.avatarKey) ?? null);

  login(userData: IUserReqDTO) {
    return this.httpClient
      .post<ResponseBase<ILoginResDTO>>(this.url + '/login', userData)
      .pipe(
        switchMap(res => {
          const [accessToken, refreshToken, user] = [
            res.data?.access_token ?? '',
            res.data?.refresh_token ?? '',
            res.data?.user ?? {
              code: '',
              fullName: '',
              username: '',
            },
          ];
          localStorage.setItem(this.accessTokenKey, accessToken);
          localStorage.setItem(this.refreshTokenKey, refreshToken);
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.access_token.set(accessToken);
          this.user.set(user);
          this.getPermissions().subscribe({
            next: _res => {
              let returnUrl =
                this.route.snapshot.queryParamMap.get('returnUrl');
              if (!returnUrl || returnUrl?.includes('auth')) {
                returnUrl = '/admin';
              }
              this.router.navigateByUrl(returnUrl);
            },
          });
          if (this.user()?.username !== 'admin') {
            this.getAvatar();
          }
          return of(true);
        })
      );
  }

  logout(returnUrl?: string): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.permissionKey);
    localStorage.removeItem(this.userKey);
    this.access_token.set(null);
    this.refresh_token.set(null);
    this.permissions().clear();
    this.avatar.set(null);
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: returnUrl },
    });
  }

  refreshAccessToken() {
    // refresh token
  }

  setPassword(body: SetPasswordReqDTO) {
    return this.httpClient.put(this.url + '/account-auth', body);
  }

  updatePassword(body: UpdatePasswordReqDTO) {
    return this.httpClient.put(this.url + '/change-password', body);
  }

  forgotPassword(body: ForgotPasswordReqDTO) {
    return this.httpClient.put(this.url + '/forgot-password', body);
  }

  sendMailForgotPassword(email: string) {
    return this.httpClient.post(this.url + '/send-mail-forgot-password', {
      email,
    });
  }

  getPermissions() {
    return this.httpClient
      .get<
        ResponseBase<PermissionServiceResDTO>
      >(environment.API_URL + '/menus/list-permission-by-username')
      .pipe(
        switchMap(res => {
          const permissions: string[] = [];
          res.data.menu.forEach(menu => {
            if (menu?.service) {
              permissions.push(...menu.service);
            }
          });
          localStorage.setItem(this.permissionKey, JSON.stringify(permissions));
          localStorage.setItem(
            this.menuPermissionKey,
            JSON.stringify(res.data.menuCode ?? [])
          );
          this.permissions.set(new Set(permissions));
          this.menuPermissions.set(new Set(res.data.menuCode ?? []));
          return of(res.data);
        })
      );
  }

  getAvatar() {
    this.httpClient
      .get<ResponseBase<string>>(environment.API_URL + '/employee/avatar')
      .subscribe({
        next: res => {
          if (res.data) {
            this.avatar.set(res.data);
            localStorage.setItem(this.avatarKey, res.data);
          }
        },
      });
  }

  hasPermission(code: string) {
    if (this.user()?.username === 'admin') {
      return true;
    }
    return this.permissions().has(code);
  }

  hasMenuPermission(code: string) {
    if (this.user()?.username === 'admin') {
      return true;
    }
    return this.menuPermissions().has(code);
  }
}
