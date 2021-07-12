import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { JSON_KEY, USER_ID_KEY, TOKEN_KEY } from '../util/constants';
import { v4 as uuidv4} from 'uuid';
import { AppConfig } from '../util/AppConfig';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AudioFile } from '../model/AudioFile';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { TagColorizer } from '../util/TagColorizer';
import { LibraryResponseDTO } from '../model/Dto';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private localStorage: LocalStorageService, private http: HttpClient) {
    this.files.subscribe(newFiles => {
      this.recommendedFiles.next([]);
      this.selectedFile.next(undefined);
    })
  }

  set token(value: string) {
    this.currentToken.next(value);
    localStorage.setItem(TOKEN_KEY, value);
  }
 
  get token() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token == null) {
      return ""
    }

    return token
  }

  private baseUrl = 'http://localhost:8080'
  public files: BehaviorSubject<Array<AudioFile>> = new BehaviorSubject<Array<AudioFile>>([]);
  public recommendedFiles: Subject<Array<AudioFile>> = new Subject<Array<AudioFile>>();

  public selectedFile: Subject<AudioFile | undefined> = new Subject<AudioFile | undefined>();
  public currentToken: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
  public currentLibraryName: BehaviorSubject<string> = new BehaviorSubject<string>("");

  selectAudioFile(file: AudioFile) {
    this.selectedFile.next(file);
  }

  publishFiles(files: Array<File>, libData: LibraryResponseDTO) {
    this.currentLibraryName.next(libData.libName);

    let audioFiles = files.map(file => {
      const dtoData = libData.samples.find(sample => {
        return file.name.includes(sample.name);
      });
      if (dtoData == undefined) {
        return undefined;
      }
      console.log(dtoData.tags)
      return new AudioFile(file, dtoData.isFavorite, dtoData.tags);
    });

    const _audioFiles = audioFiles.filter(file => {
      return file != undefined;
    }) as Array<AudioFile>;

    this.files.next(_audioFiles);
  }

  getCustomTags() {
    const filesCustomTagged = this.files.getValue().filter(file => {
      return file.tags.filter(tag => {
        return !TagColorizer.instance.tagList.includes(tag);
      }).length > 0;
  });


    const payload = filesCustomTagged.map(file => {
      const customTags = file.tags.filter(tag => {
        return !TagColorizer.instance.tagList.includes(tag);
      });

      return { name: file.file.name, customTags: customTags };
    })

    console.log('usertags ' + payload)

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.currentToken.getValue());

    return this.http.post(`${this.baseUrl}/usertags/${this.currentLibraryName.getValue()}`, payload, {
      responseType: 'json',
      headers: headers
    }).subscribe((result: any) => {
      
      this.files.getValue().forEach(file => {
        const strippedName = file.file.name.split('.')[0]
        const newTags = result[strippedName];

        if (newTags != undefined) {
          file.tags.push(newTags);
        }
      })
    })
  }
  
  getRecommendations() {
    const likedFiles = this.files.getValue().filter(file => {
      return file.isFavorite;
    });

    const payload = likedFiles.map(file => {
      return { name: file.file.name };
    });

    console.log('liked files ' + payload)

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.currentToken.getValue());

    this.http.post(`${this.baseUrl}/recommendations/${this.currentLibraryName.getValue()}`, payload, {
      responseType: 'json',
      headers: headers
    }).subscribe((recommendedFiles: any) => {

      let filteredNames = recommendedFiles.map((file: any) => {
        return file.name;
      });

      console.log('recommended files ' + filteredNames)

      let filtered = this.files.getValue().filter(file => {
        const strippedName = file.file.name.split('.')[0]
        return filteredNames.includes(strippedName)
      });

      console.log(filtered)

      this.recommendedFiles.next(filtered)
    })
  }
}
