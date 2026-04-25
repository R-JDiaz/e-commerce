import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Checkout } from './checkout';
import { CartManager } from '@common/services/managers/cart/cart';
import { Auth } from '@common/services/managers/auth/auth';
import { OrderManager } from '@common/services/managers/order/order';

describe('Checkout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout, RouterTestingModule],
      providers: [
        {
          provide: CartManager,
          useValue: {
            cartItems$: of([]),
            getTotalPrice: () => 0,
            clearCart: () => {},
          },
        },
        {
          provide: Auth,
          useValue: {
            getCurrentUser: () => ({ id: '1', email: 'test@example.com', type: 'user', name: 'Test User' }),
            logout: () => {},
          },
        },
        {
          provide: OrderManager,
          useValue: {
            placeOrder: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Checkout);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
