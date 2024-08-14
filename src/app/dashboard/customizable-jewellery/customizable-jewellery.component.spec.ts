import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableJewelleryComponent } from './customizable-jewellery.component';

describe('CustomizableJewelleryComponent', () => {
  let component: CustomizableJewelleryComponent;
  let fixture: ComponentFixture<CustomizableJewelleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomizableJewelleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizableJewelleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
