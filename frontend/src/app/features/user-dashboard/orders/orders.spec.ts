import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Orders } from './orders';
import { Auth } from '@common/services/managers/auth/auth';
import { OrderManager } from '@common/services/managers/order/order';

describe('Orders', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orders, RouterTestingModule],
      providers: [
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
            getUserOrders: () => of([]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Orders);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
