import { Component } from '@angular/core';

import { ProductListItem } from '@common/models/product';
import { CartManager } from '@common/services/managers/cart/cart';
import { Auth } from '@common/services/managers/auth/auth';
import { Router } from '@angular/router';
import { NavigationComponent } from '@common/components/navigation/navigation';

import { Products } from './products/products';

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
export class UserDashboard {
  constructor(
    private CartManager: CartManager,
    private authService: Auth,
    private router: Router
  ) {}

  addToCart(product: ProductListItem) {
    this.CartManager.addToCart(product);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
