import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AudioFile } from 'src/app/model/AudioFile';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  token: BehaviorSubject<string> = new BehaviorSubject("");
  files: AudioFile[] = [];
  currentLibrary!: string;

  private routeParamsSub?: Subscription
  private fileSub?: Subscription
  
  constructor(private route: ActivatedRoute, private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe(newParams => {
      this.token.next(newParams['token']);
      console.log(newParams['token'])
    });

    this.appStateService.currentLibraryName.subscribe(newLib => {
      this.currentLibrary = newLib;
    })

    this.fileSub = this.appStateService.files.subscribe(newFiles => {
      this.files = newFiles;
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub?.unsubscribe();
    this.fileSub?.unsubscribe();
  }

}
