import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDTO, LibraryResponseDTO } from '../model/Dto';
import { BASE_URL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class SampleUploadDialogService {
  
  constructor(private http: HttpClient) { }

  uploadFile(token: string, libName: string, file: File): Observable<HttpEvent<GenericResponseDTO>> {
    const formData = new FormData();

    formData.append('file', file)
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const req = new HttpRequest('POST', `${BASE_URL}/upload/${libName}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headers
    });

    return this.http.request(req);
  }

  analyzeLibrary(token: string, libName: string): Observable<GenericResponseDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<GenericResponseDTO>(`${BASE_URL}/analyze/${libName}`, {
      headers: headers,
      responseType: 'json'
    });
  }

  getTags(token: string, libName: string): Observable<LibraryResponseDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<LibraryResponseDTO>(`${BASE_URL}/tags/${libName}`, {
      headers: headers,
      responseType: 'json'
    });
  }
}
