import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';

import { Auth } from '@common/services/managers/auth/auth';
import { Order, OrderData, OrderManager } from '@common/services/managers/order/order';
import { NavigationComponent } from '@common/components/navigation/navigation';
import { OrderCardComponent } from './order-card/order-card';
import { PaymentManager } from '@common/services/managers/payment/payment';
import { CheckoutPaymentRequest } from '@common/services/api/payment/payment-api.service';
import { ToastManager } from '@common/services/managers/toast/toast.manager';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    OrderCardComponent
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})

export class Orders implements OnInit {

  orders$!: Observable<Order[]>;
  orderData$!: Observable<OrderData>
  isLoading = false;
  errorMessage = '';

  constructor(
    private orderManager: OrderManager,
    private authService: Auth,
    private router: Router,
    private paymentManager: PaymentManager, 
    private toastManager: ToastManager
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders$ = this.orderManager.getDetailedOrder();
  }

  payAmount(event: { id: string; amount: number }): void {
    console.log('Paying order:', event.id);
    console.log('Amount:', event.amount);

    const data: CheckoutPaymentRequest = {
      order_id: event.id,
      payment_method: 'cash',
      cash: event.amount,
    };

    console.log(data);

    this.paymentManager.checkoutPayment(data).subscribe({
      next: (result) => {
        this.toastManager.success(String(result));

        // refresh order AFTER successful payment
        this.orderManager.refreshOrder(event.id).subscribe({
          next: () => {
            console.log('Order refreshed');
          },
          error: (err) => {
            console.error('Failed to refresh order:', err);
          },
        });
      },

      error: (err) => {
        console.error('Payment failed:', err);
        this.toastManager.error?.(err?.message ?? 'Payment failed');
      },
    });
  }

  markReceived(orderId: string): void {
    this.errorMessage = '';

    this.orderManager.updateOrderStatus(orderId, 'completed').subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.errorMessage = 'Failed to update order status';
      }
    });
  }

  backToShop(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}