import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { Auth } from '@common/services/managers/auth/auth';

const AUTH_ENDPOINT_PATTERN = /\/auth\/(login|register|refresh|logout)$/;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || error.status === 403) && !AUTH_ENDPOINT_PATTERN.test(req.url)) {
        auth.clearSession();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
