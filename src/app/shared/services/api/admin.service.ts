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

  adminUsers(searchQuery:string,userRole:string): Observable<any> {
    let params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('userRole', userRole);
    const url = `${environment.apiUrl}/admin/users`;
    return this.http.get(url,{ params }).pipe();
  }

  profile(userId:string): Observable<any> {
    const url = `${environment.apiUrl}/admin/profile/${userId}`;
    return this.http.get(url).pipe();
  }

  updateProfile(data: any): Observable<any> {
    const url = `${environment.apiUrl}/admin/updateProfile`;
    return this.http.post(url, data).pipe();
  }


}
