import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { CommonService } from '../helper/common.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _authService = inject(AuthService)
  const _commonService = inject(CommonService)
  if (!_authService.isTokenExpired()) {
    _commonService.redirectToHome()
    return false;
  }
  return true;
};
