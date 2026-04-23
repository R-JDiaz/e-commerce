import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartItem, CartService } from '@common/services/managers/cart/cart';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  cartItems$!: Observable<CartItem[]>;
  totalItems$!: Observable<number>;
  totalPrice$!: Observable<number>;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;
    this.totalItems$ = this.cartService.totalItems$;
    this.totalPrice$ = this.cartService.totalPrice$;
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    const hasItems = this.cartService.getCartItems().length > 0;
    if (!hasItems) {
      return;
    }

    this.router.navigate(['/checkout']);
  }

  trackByProductId(_index: number, item: { product: { id: string } }): string {
    return item.product.id;
  }
}
