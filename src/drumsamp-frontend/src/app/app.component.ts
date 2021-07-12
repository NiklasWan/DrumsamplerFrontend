import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibrarySelectionDialogComponent } from './components/library-selection-dialog/library-selection-dialog.component';
import { SampleUploadDialogComponent } from './components/sample-upload-dialog/sample-upload-dialog.component';
import { AudioFile } from './model/AudioFile';
import { AppStateService } from './services/app-state.service';
import { TagColorizer } from './util/TagColorizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'drumsamp-frontend';

  isUserLoggedIn = false;
  currentToken = "";
  files: AudioFile[] = [];

  private tokenSubscription?: Subscription

  constructor(private appStateService: AppStateService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.tokenSubscription = this.appStateService.currentToken.subscribe(currentToken => {
      if (currentToken.length == 0) {
        this.isUserLoggedIn = false;
        
        this.router.navigateByUrl('/login');
      } else {
        this.isUserLoggedIn = true;
        this.currentToken = currentToken

        this.router.navigate(['home', currentToken]);
      }
    });
  }

  ngOnDestroy() {
    this.tokenSubscription?.unsubscribe();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.currentToken;
    this.dialog.open(SampleUploadDialogComponent, dialogConfig);
  }

  logout() {
    this.appStateService.recommendedFiles.next([]);
    this.appStateService.selectedFile.next(undefined);
    this.appStateService.files.next([]);
    this.appStateService.token = "";
  }

  getRecommendations() {
      this.appStateService.getRecommendations();
  }

  getCustomTags() {
    this.appStateService.getCustomTags();
  }

  openLibrary() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.currentToken;
    this.dialog.open(LibrarySelectionDialogComponent, dialogConfig);
  }

}
