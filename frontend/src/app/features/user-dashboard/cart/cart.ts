import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartService } from '@common/services/managers/cart/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.totalItems$ = this.cartService.totalItems$;
    this.totalPrice$ = this.cartService.totalPrice$;
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
