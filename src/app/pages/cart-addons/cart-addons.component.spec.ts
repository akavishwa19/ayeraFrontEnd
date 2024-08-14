import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddonsComponent } from './cart-addons.component';

describe('CartAddonsComponent', () => {
  let component: CartAddonsComponent;
  let fixture: ComponentFixture<CartAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartAddonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
