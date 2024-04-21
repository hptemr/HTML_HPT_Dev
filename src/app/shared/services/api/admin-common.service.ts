import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCommonService {

  constructor(
    private http: HttpClient
  ) { }

  changePassword(data: any): Observable<any> {
    const url = `${environment.apiUrl}/adminCommon/changePassword`;
    return this.http.post(url, data).pipe();
  }

}
