import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';

import { Auth } from '@common/services/managers/auth/auth';
import { Order, OrderData, OrderManager } from '@common/services/managers/order/order';
import { NavigationComponent } from '@common/components/navigation/navigation';
import { OrderCardComponent } from './order-card/order-card';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders$ = this.orderManager.getDetailedOrder();
  }

  // ✅ mark order as received
  markReceived(orderId: string): void {
    this.errorMessage = '';

    this.orderManager.updateOrderStatus(orderId, 'completed').subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.errorMessage = 'Failed to update order status';
      }
    });
  }

  // 🔙 navigation
  backToShop(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}