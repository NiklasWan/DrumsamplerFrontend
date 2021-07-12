import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, forkJoin, Subject } from 'rxjs';
import { AudioFile } from 'src/app/model/AudioFile';
import { UploadProgressModel } from 'src/app/model/UploadProgressModel';
import { AppStateService } from 'src/app/services/app-state.service';
import { SampleUploadDialogService } from 'src/app/services/sample-upload-dialog.service';

@Component({
  selector: 'app-sample-upload-dialog',
  templateUrl: './sample-upload-dialog.component.html',
  styleUrls: ['./sample-upload-dialog.component.scss']
})
export class SampleUploadDialogComponent implements OnInit {

  files: File[] = [];
  token: string;
  private finishedCounter = new BehaviorSubject<number>(0);
  private failedCounter = new BehaviorSubject<number>(0);
  viewState = 'libraryName';
  libName = "";

  libraryForm: FormGroup = this.formBuilder.group({
    libName: [, { validators: [Validators.required], updateOn: "change" }]
  });

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<SampleUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private appStateService: AppStateService, private sampleUploadService: SampleUploadDialogService) {
    this.token = data;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.libraryForm.valid) {
      this.libName = this.libraryForm.value['libName'];
      this.viewState = 'fileChooser';
    }
  }

  onFilesSelected(event: any) {
    this.files = Array.from(event.target.files);
    console.log(event.target.files.length)

    this.viewState = 'uploadProgress';
    this.libName = this.libraryForm.value['libName']

    combineLatest([this.finishedCounter, this.failedCounter]).subscribe(([finishedNum, failedNum]) => {
      console.log('finished num ' + finishedNum + ' failed num ' + failedNum)
      if (finishedNum == this.files.length) {
        this.viewState = 'analysisProgress';
        this.sampleUploadService.analyzeLibrary(this.token, this.libName).subscribe(res => {
          this.sampleUploadService.getTags(this.token, this.libName).subscribe(result => {
            console.log(result)
            this.appStateService.publishFiles(this.files, result);
            this.close();
          }, err => {
            alert('Error while tagging ' + err.error);
            this.close();
          })
        }, err => {
          alert('Error while analyzing ' + err.error);
          this.close();
        })
      } else if (finishedNum + failedNum == this.files.length) {
        alert('Error in uploading Files');
        this.close()
      }
    })
    for (let i = 0; i < this.files.length; i++) {
      this.sampleUploadService.uploadFile(this.token, this.libName, this.files[i]).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.finishedCounter.next(this.finishedCounter.getValue() + 1)
          }
        },
        err => {
          this.failedCounter.next(this.failedCounter.getValue() + 1)
        });
    }
  }
}
