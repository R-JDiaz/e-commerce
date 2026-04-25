import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrderManager } from './order';
import { OrderApiService } from '@common/services/api/order/order-api.service';

describe('Order', () => {
  let service: OrderManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrderApiService,
          useValue: {
            getOrders: () => of([]),
            getOrderById: () => of({
              id: 1,
              user_id: 1,
              total_amount: 0,
              status: 'pending',
              shipping_addr: '',
              items: [],
              created_at: new Date().toISOString(),
            }),
            createOrder: () => of({
              id: 1,
              user_id: 1,
              total_amount: 0,
              status: 'pending',
              shipping_addr: '',
              items: [],
              created_at: new Date().toISOString(),
            }),
            updateOrderStatus: () => of({
              id: 1,
              user_id: 1,
              total_amount: 0,
              status: 'accepted',
              shipping_addr: '',
              items: [],
              created_at: new Date().toISOString(),
            }),
          },
        },
      ],
    });
    service = TestBed.inject(OrderManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
