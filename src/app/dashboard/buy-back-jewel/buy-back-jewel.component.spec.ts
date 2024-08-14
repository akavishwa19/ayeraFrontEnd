import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBackJewelComponent } from './buy-back-jewel.component';

describe('BuyBackJewelComponent', () => {
  let component: BuyBackJewelComponent;
  let fixture: ComponentFixture<BuyBackJewelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyBackJewelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyBackJewelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
