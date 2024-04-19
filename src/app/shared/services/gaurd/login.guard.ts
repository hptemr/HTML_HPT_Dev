import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  /* 
    >> If user already login on same browser and token not expired or removed from local storage
     then if anyone hit login page its directly redirect on system admin dashbourd.
     This login guard use in login page route
  */ 
  const _router = inject(Router)
  const _authService = inject(AuthService)
  if (!_authService.isTokenExpired()) {
      _router.navigate(['/system-admin/user-managment/practice-admin']);
      return false;
  }
  return true;
};
