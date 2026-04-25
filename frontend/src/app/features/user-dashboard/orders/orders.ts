import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Auth } from '@common/services/managers/auth/auth';
import { Order, OrderManager } from '@common/services/managers/order/order';
import { NavigationComponent } from '@common/components/navigation/navigation';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orders: Order[] = [];
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

  get totalSpent(): number {
    return this.orders.reduce((sum, order) => sum + order.total, 0);
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  loadOrders(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.orderManager.getUserOrders(user.id).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders';
        this.isLoading = false;
      },
    });
  }

  markReceived(orderId: string): void {
    this.isLoading = true;
    this.orderManager.updateOrderStatus(orderId, 'completed').subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.errorMessage = 'Failed to update order status';
        this.isLoading = false;
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
