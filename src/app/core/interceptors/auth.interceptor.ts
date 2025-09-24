import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
  }
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(({ access_token }) => {
            localStorage.setItem('access_token', access_token);
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${access_token}`,
              },
            });
            return next(retryReq);
          }),
          catchError(refreshError => {
            const currentUrl = router.url;
            authService.logout(currentUrl);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
