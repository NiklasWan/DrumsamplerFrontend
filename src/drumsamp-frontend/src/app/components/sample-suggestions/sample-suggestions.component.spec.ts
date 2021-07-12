import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSuggestionsComponent } from './sample-suggestions.component';

describe('SampleSuggestionsComponent', () => {
  let component: SampleSuggestionsComponent;
  let fixture: ComponentFixture<SampleSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
