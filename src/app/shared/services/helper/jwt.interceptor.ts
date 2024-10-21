import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userData:any = localStorage.getItem('user');
        userData = (userData && userData!=null)?JSON.parse(userData):null
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (!this.authService.isTokenExpired() && userData!=null) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${userData.token}` }
            });
        }
        // return next.handle(request);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401 ) {
                // Handle unauthorized
                let req_vars = { _id: userData?._id, userType: userData?.role }
                this.authService.apiRequest('post', 'auth/logout', req_vars).subscribe(result => { })
                this.authService.logout(userData.role)
              }
              return throwError(error); // Return the error back to the component
            })
        );
    
    }
}