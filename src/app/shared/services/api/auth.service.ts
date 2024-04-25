import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(data: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/userLogin`;
    return this.http.post(url, data).pipe();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getLoggedInInfo(column = 'all') {
    let data: any
    let storage: any
    storage = localStorage.getItem('user') ? localStorage.getItem('user') : null
    let user_details = JSON.parse(storage);
    if (column == 'all') {
      data = user_details
    } else {
      data = user_details[column]
    }
    return data
  }

  getFullName() {
    return this.getLoggedInInfo('firstName') + " " + this.getLoggedInInfo('lastName')
  }

  isTokenExpired(): boolean {
    let userData: any = localStorage.getItem('user');
    userData = (userData && userData != null) ? JSON.parse(userData) : null
    if (userData == null || userData.token == "" || userData.token == undefined) {
      return true
    }
    const decodedToken: any = jwtDecode(userData.token);
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
  }

  forgotPassword(data: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/forgotPassword`;
    return this.http.post(url, data).pipe();
  }

  checkForgotPasswordToken(userId: string, token: string): Observable<any> {
    const url = `${environment.apiUrl}/auth/checkForgotPasswordToken/${userId}/${token}`;
    return this.http.get(url).pipe();
  }

  resetPassword(data: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/resetPassword`;
    return this.http.post(url, data).pipe();
  }

}
