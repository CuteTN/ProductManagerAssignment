import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStarRatingComponent } from './select-star-rating.component';

describe('SelectStarRatingComponent', () => {
  let component: SelectStarRatingComponent;
  let fixture: ComponentFixture<SelectStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStarRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
