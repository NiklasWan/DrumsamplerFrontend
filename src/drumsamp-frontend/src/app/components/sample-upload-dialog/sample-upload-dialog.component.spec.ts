import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleUploadDialogComponent } from './sample-upload-dialog.component';

describe('SampleUploadDialogComponent', () => {
  let component: SampleUploadDialogComponent;
  let fixture: ComponentFixture<SampleUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
