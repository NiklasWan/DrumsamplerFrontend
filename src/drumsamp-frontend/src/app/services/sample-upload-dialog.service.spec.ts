import { TestBed } from '@angular/core/testing';

import { SampleUploadDialogService } from './sample-upload-dialog.service';

describe('SampleUploadDialogService', () => {
  let service: SampleUploadDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleUploadDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
