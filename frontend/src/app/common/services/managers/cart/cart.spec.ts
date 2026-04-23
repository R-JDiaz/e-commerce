import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CartService } from './cart';
import { CartApiService } from '@common/services/api/cart/cart-api.service';

describe('Cart', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CartApiService,
          useValue: {
            getCart: () => of({ id: 1, user_id: 1, products: [], total_items: 0, total_price: 0 }),
            addItem: () => of({ id: 1, user_id: 1, products: [], total_items: 0, total_price: 0 }),
            updateItem: () => of({ id: 1, user_id: 1, products: [], total_items: 0, total_price: 0 }),
            removeItem: () => of({ id: 1, user_id: 1, products: [], total_items: 0, total_price: 0 }),
            clearCart: () => of(true),
          },
        },
      ],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
