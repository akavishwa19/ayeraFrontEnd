import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedProductCardComponent } from './suggested-product-card.component';

describe('SuggestedProductCardComponent', () => {
  let component: SuggestedProductCardComponent;
  let fixture: ComponentFixture<SuggestedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestedProductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
