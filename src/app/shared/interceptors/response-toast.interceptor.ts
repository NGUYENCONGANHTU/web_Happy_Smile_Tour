import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification'; // Import the NzNotificationService

export const responseToastInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NzNotificationService);

  // Handle success responses
  // function handleSuccess(event: HttpResponse<any>) {
  //   switch (event.status) {
  //     case 200:
  //       notification.success(
  //         'Success',
  //         'Request completed successfully!',
  //         { nzDuration: 3000 }
  //       );
  //       break;
  //     case 201:
  //       notification.success(
  //         'Created',
  //         'Resource created successfully!',
  //         { nzDuration: 3000 }
  //       );
  //       break;
  //     case 204:
  //       notification.info(
  //         'No Content',
  //         'No content to display.',
  //         { nzDuration: 3000 }
  //       );
  //       break;
  //     default:
  //       notification.success(
  //         'Success',
  //         `Operation completed with status: ${event.status}`,
  //         { nzDuration: 3000 }
  //       );
  //       break;
  //   }
  // }

  // Handle error responses
  function handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500:
      case 503:
      default:
        notification.error(
          'Lỗi',
          error.error?.message ?? 'Lỗi không xác định!',
          { nzDuration: 3000 }
        );
    }
  }

  return next(req).pipe(
    // tap((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     handleSuccess(event);
    //   }
    // }),
    catchError((error: HttpErrorResponse) => {
      handleError(error);
      throw error; // Re-throw the error so the app can handle it
    })
  );
};
