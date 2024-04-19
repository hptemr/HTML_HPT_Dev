import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userData:any = localStorage.getItem('user');
        userData = (userData && userData!=null)?JSON.parse(userData):null
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log("JwtInterceptor>>>>",this.authService.isTokenExpired())
        if (!this.authService.isTokenExpired() && userData!=null) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${userData.token}` }
            });
        }
        return next.handle(request);
    }
}