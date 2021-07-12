import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDTO } from '../model/Dto';
import { BASE_URL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }

  toggleFavorite(token: string, libraryName: string, sampleName: string, isFavorite: boolean): Observable<GenericResponseDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<GenericResponseDTO>(`${BASE_URL}/samplefavorite/update/${libraryName}/${sampleName}`, {
      'isFavorite': isFavorite
    }, {
      headers: headers,
      responseType: 'json'
    });
  }

  modifyTags(token: string, libraryName: string, sampleName: string, tags: string[]): Observable<GenericResponseDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<GenericResponseDTO>(`${BASE_URL}/sampletag/update/${libraryName}/${sampleName}`, {
      'tags': tags
    }, {
      headers: headers,
      responseType: 'json'
    });
  }
}
