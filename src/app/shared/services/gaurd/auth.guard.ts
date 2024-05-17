import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { inject } from '@angular/core';
import { CommonService } from '../helper/common.service';

export const AuthGuard: CanActivateFn = (routeInfo: ActivatedRouteSnapshot) => {
  const _commonService = inject(CommonService)
  const _authService = inject(AuthService)
  var isLogin = _authService.isUserLoggedIn();
  if (isLogin === false) {
    const _router = inject(Router)
    _router.navigate(['/'])
    return false;
  } else {
    let role = routeInfo.data['roles'][0]
    if (role && _authService.hasRole(role)) {
      return true;
    } else {
      //If access other user URL, then check and redirect to current logged in user dashboard.
      _commonService.redirectToHome()
      return false
    }
  }
}