import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAndRatingsComponent } from './reviews-and-ratings.component';

describe('ReviewsAndRatingsComponent', () => {
  let component: ReviewsAndRatingsComponent;
  let fixture: ComponentFixture<ReviewsAndRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsAndRatingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsAndRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
