import { TestBed } from '@angular/core/testing';

import { LibrarySelectionService } from './library-selection.service';

describe('LibrarySelectionService', () => {
  let service: LibrarySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
