import { Component, OnInit } from '@angular/core';

import { ProductListItem } from '@common/models/product';
import { CartManager } from '@common/services/managers/cart/cart';
import { Auth } from '@common/services/managers/auth/auth';
import { Router } from '@angular/router';
import { NavigationComponent } from '@common/components/navigation/navigation';

import { Products } from './products/products';
import { OrderManager } from '@common/services/managers/order/order';
import { NotificationManager } from '@common/services/managers/notification/notification.manager';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
     Products, 
     NavigationComponent
    ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit {
  constructor(
    private CartManager: CartManager,
    private notifManager: NotificationManager,
    private authService: Auth,
    private router: Router,
    private OrderManager: OrderManager
  ) {}
  
  ngOnInit(): void {
    this.notifManager.load();
  }
  addToCart(product: ProductListItem) {
    this.CartManager.addToCart(product);
  }

  logout() {
    this.OrderManager.clearState();
    this.notifManager.clearNotifications();
    this.CartManager.clearCart();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
