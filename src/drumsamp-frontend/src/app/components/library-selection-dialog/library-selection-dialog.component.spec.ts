import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySelectionDialogComponent } from './library-selection-dialog.component';

describe('LibrarySelectionDialogComponent', () => {
  let component: LibrarySelectionDialogComponent;
  let fixture: ComponentFixture<LibrarySelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarySelectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
