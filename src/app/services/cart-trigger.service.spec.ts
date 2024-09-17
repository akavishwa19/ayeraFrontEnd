import { TestBed } from '@angular/core/testing';

import { CartTriggerService } from './cart-trigger.service';

describe('CartTriggerService', () => {
  let service: CartTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
