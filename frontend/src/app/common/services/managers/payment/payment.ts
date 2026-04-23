import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PaymentApiService,
  PaymentCheckoutResponse,
  CheckoutPaymentRequest,
} from '@common/services/api/payment/payment-api.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentManager {
  constructor(private api: PaymentApiService) {}

  checkoutPayment(data: CheckoutPaymentRequest): Observable<PaymentCheckoutResponse> {
    return this.api.checkoutPayment(data);
  }

  getPaymentById(id: number | string): Observable<PaymentCheckoutResponse> {
    return this.api.getPaymentById(id);
  }
}
