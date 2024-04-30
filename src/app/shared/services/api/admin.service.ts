import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  invite(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/invite`;
    return this.http.post(url, data).pipe();
  }

  changePassword(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/changePassword`;
    return this.http.post(url, data).pipe();
  }

  adminUsers(searchQuery: string, userRole: string): Observable<any> {
    let params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('userRole', userRole);
    const url = `${environment.apiUrl}/admin/users`;
    return this.http.get(url, { params }).pipe();
  }

  profile(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/profile`;
    return this.http.post(url, data).pipe();
  }

  updateProfile(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/updateProfile`;
    return this.http.post(url, data).pipe();
  }

  updateUser(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/updateUser`;
    return this.http.post(url, data).pipe();
  }

  getUserDetails(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/getUserDetails`;
    return this.http.post(url, data).pipe();
  }

  getPatientList(data: any): Observable<any> {
    const url = `${environment.apiUrl}/patients/getPatientList`;
    return this.http.post(url, data).pipe();
  }
}
