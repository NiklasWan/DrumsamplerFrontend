import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryResponseDTO } from '../model/Dto';
import { BASE_URL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class LibrarySelectionService {

  constructor(private http: HttpClient) { }

  getLibraries(token: string): Observable<string[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<string[]>(`${BASE_URL}/get/libraries`, {
      headers: headers,
      responseType: 'json'
    });
  }

  selectLibrary(token: string, libraryName: string): Observable<LibraryResponseDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<LibraryResponseDTO>(`${BASE_URL}/get/library/${libraryName}`, {
      headers: headers,
      responseType: 'json'
    });
  }
}
