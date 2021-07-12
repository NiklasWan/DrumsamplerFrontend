import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<HttpEvent<any>> {
    const formData = new FormData();

    formData.append('mail', email)
    formData.append('password', password)

    const req = new HttpRequest('POST', `${BASE_URL}/register`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
