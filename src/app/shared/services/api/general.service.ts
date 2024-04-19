import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient
  ) { }

  getPracticeLocation(): Observable<any> {
    const url = `${environment.apiUrl}/comman/getPracticeLocation`;
    return this.http.get(url).pipe();
  }

}
