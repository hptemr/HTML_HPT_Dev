import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {

  constructor(
    private http: HttpClient
  ) { }

  profile(): Observable<any> {
    const url = `${environment.apiUrl}/systemAdmin/profile`;
    return this.http.get(url).pipe();
  }

  updateProfile(data: any): Observable<any> {
    const url = `${environment.apiUrl}/systemAdmin/updateProfile`;
    return this.http.post(url, data).pipe();
  }

  changePassword(data: any): Observable<any> {
    const url = `${environment.apiUrl}/systemAdmin/changePassword`;
    return this.http.post(url, data).pipe();
  }

}
