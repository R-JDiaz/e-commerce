import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthManager } from '@common/services/managers/auth/auth';
import { ToastManager } from '@common/services/managers/toast/toast.manager';

type RequiredRole = 'customer' | 'admin';

const AUTH_ERROR_MESSAGE = 'Please sign in to access this page.';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthManager);
  const router = inject(Router);
  const toast = inject(ToastManager);
  const requiredRole = route.data?.['role'] as RequiredRole | undefined;
  const currentRole = auth.getRole();

  if (!auth.isAuthenticated() || !currentRole) {
    toast.error(AUTH_ERROR_MESSAGE);
    return router.createUrlTree(['/login']);
  }

  if (requiredRole && currentRole !== requiredRole) {
    toast.error(
      requiredRole === 'admin'
        ? 'Admin access required. Please sign in with an admin account.'
        : 'Customer access required. Please sign in with a customer account.'
    );
    return router.createUrlTree(['/login']);
  }

  return true;
};
