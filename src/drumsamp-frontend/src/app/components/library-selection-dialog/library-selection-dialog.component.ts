import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state.service';
import { LibrarySelectionService } from 'src/app/services/library-selection.service';
import { SampleUploadDialogComponent } from '../sample-upload-dialog/sample-upload-dialog.component';

@Component({
  selector: 'app-library-selection-dialog',
  templateUrl: './library-selection-dialog.component.html',
  styleUrls: ['./library-selection-dialog.component.scss']
})
export class LibrarySelectionDialogComponent implements OnInit {
  libs: string[] = [];
  token: string = '';
  selectedLib: string = '';
  viewState: string = 'libView';

  constructor(private dialogRef: MatDialogRef<SampleUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private appStateService: AppStateService, private librarySelectionService: LibrarySelectionService) {
    this.token = data;
  }

  ngOnInit(): void {
    this.librarySelectionService.getLibraries(this.token).subscribe(libNames => {
      this.libs = libNames;
    })
  }

  onLibSelected(libraryName: string) {
    this.selectedLib = libraryName;
    this.viewState = 'fileChooser';
  }

  onFilesSelected(event: any) {
    this.viewState = 'fetchProgress';
    const files: File[] = Array.from(event.target.files);

    this.librarySelectionService.selectLibrary(this.token, this.selectedLib).subscribe(library => {
      this.appStateService.publishFiles(files, library);
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
