import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInComparisonComponent } from './product-in-comparison.component';

describe('ProductInComparisonComponent', () => {
  let component: ProductInComparisonComponent;
  let fixture: ComponentFixture<ProductInComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductInComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
