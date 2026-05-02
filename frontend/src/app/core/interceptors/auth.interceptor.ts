import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthManager } from '@common/services/managers/auth/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthManager);
  const token = auth.getAccessToken();

  if (!token || req.headers.has('Authorization')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
