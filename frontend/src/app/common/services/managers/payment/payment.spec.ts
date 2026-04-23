import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PaymentManager } from './payment';
import { PaymentApiService } from '@common/services/api/payment/payment-api.service';

describe('PaymentManager', () => {
  let service: PaymentManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PaymentApiService,
          useValue: {
            checkoutPayment: () => of({
              payment: {
                id: 1,
                order_id: 1,
                amount: 100,
                payment_method: 'cash',
                status: 'paid',
                transaction_id: 'txn',
                created_at: new Date().toISOString(),
              },
              order: {
                id: 1,
                user_id: 1,
                total_amount: 100,
                status: 'paid',
                shipping_addr: '',
                created_at: new Date().toISOString(),
              },
            }),
            getPaymentById: () => of({
              payment: {
                id: 1,
                order_id: 1,
                amount: 100,
                payment_method: 'cash',
                status: 'paid',
                transaction_id: 'txn',
                created_at: new Date().toISOString(),
              },
              order: {
                id: 1,
                user_id: 1,
                total_amount: 100,
                status: 'paid',
                shipping_addr: '',
                created_at: new Date().toISOString(),
              },
            }),
          },
        },
      ],
    });

    service = TestBed.inject(PaymentManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
