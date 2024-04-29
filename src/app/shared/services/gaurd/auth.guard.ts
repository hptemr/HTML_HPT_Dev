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


// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) { } 
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     var isLogin = this.authService.isUserLoggedIn();
//     if (isLogin === false) {
//       this.router.navigate(['/login']);
//       return false;
//     } else {
//       let role = next.data["roles"]
//       if (role && this.authService.hasRole(role)) {
//         return true;
//       } else {
//         //If access other user URL, then check and redirect to current logged in user.
//         let redirectUrl = ''
//         switch(this.authService.getLoggedInInfo('user_type')){
//           case 'system_admin':
//             redirectUrl = '/system-signin'
//           break;
//           case 'practice_admin':
//             redirectUrl = '/practice-admin'
//           break;
//           case 'support_team':
//             redirectUrl = '/support-team'
//           break;
//           case 'billing_team':
//             redirectUrl = '/billing-team'
//           break;
//           case 'therapist':
//             redirectUrl = '/therapist'
//           break;
//         }
//         this.router.navigate([redirectUrl])
//         return false
//       }
//     }
//   }
// }
