import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _authService = inject(AuthService)
  if (!_authService.isTokenExpired()) {
      return true;
  }
  _router.navigate(['/']);
  return false;
};