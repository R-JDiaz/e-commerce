import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListItem } from '@common/models/product';
import { CartService } from '@common/services/managers/cart/cart';
import { Order, OrderService } from '@common/services/managers/order/order';
import { Auth } from '@common/services/managers/auth/auth';
import { Router } from '@angular/router';
import { NavigationComponent } from '@common/components/navigation/navigation';

import { Products } from './products/products';
import { SidebarComponent } from './sidebar/sidebar';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, Products, NavigationComponent, SidebarComponent],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit {
  orderHistory: Order[] = [];
  errorMessage: string = '';

  constructor(
    private cartService: CartService,
    private authService: Auth,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrderHistory();
  }

  loadOrderHistory() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.orderService.getUserOrders(user.id).subscribe({
      next: (orders) => this.orderHistory = orders,
      error: (err) => console.error(err)
    });
  }

  addToCart(product: ProductListItem) {
    this.cartService.addToCart(product);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
