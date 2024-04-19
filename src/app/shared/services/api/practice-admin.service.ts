import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeAdminService {

  constructor(
    private http: HttpClient
  ) { }

  invite(data: any): Observable<any> {
    const url = `${environment.apiUrl}/practiceAdmin/invite`;
    return this.http.post(url, data).pipe();
  }

  practiceAdminUsers(searchQuery:string): Observable<any> {
    const url = `${environment.apiUrl}/practiceAdmin/users?searchQuery=${searchQuery}`;
    return this.http.get(url).pipe();
  }

  profile(userId:string): Observable<any> {
    const url = `${environment.apiUrl}/practiceAdmin/profile/${userId}`;
    return this.http.get(url).pipe();
  }

}
