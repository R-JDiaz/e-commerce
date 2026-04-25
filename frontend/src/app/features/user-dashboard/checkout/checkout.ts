import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CartItem, CartManager } from '@common/services/managers/cart/cart';
import { Auth } from '@common/services/managers/auth/auth';
import { OrderManager } from '@common/services/managers/order/order';
import { NavigationComponent } from '@common/components/navigation/navigation';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary';
import { CheckoutShippingComponent } from './checkout-shipping/checkout-shipping';
import { PaymentManager } from '@common/services/managers/payment/payment';
import { ToastManager } from '@common/services/managers/toast/toast.manager';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavigationComponent,
    CheckoutSummaryComponent,
    CheckoutShippingComponent,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isSubmitting = false;
  errorMessage = '';
  isShippingOpen = true;
  checkoutForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private CartManager: CartManager,
    private authService: Auth,
    private orderManager: OrderManager,
    private router: Router,
    private paymentManager: PaymentManager,
    private toastManager: ToastManager
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.minLength(3)]],
      cashAmount: [''],
    });
  }

  ngOnInit(): void {
    this.CartManager.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;

        if (items.length === 0 && !this.isSubmitting) {
          this.router.navigate(['/user-dashboard']);
        }
      });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.checkoutForm.patchValue({
        fullName: user.name,
        email: user.email,
        phone: user.phone ?? '',
        addressLine1: user.addressLine1 ?? '',
        addressLine2: user.addressLine2 ?? '',
        city: user.city ?? '',
        state: user.state ?? '',
        postalCode: user.postalCode ?? '',
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get subtotal(): number {
    return this.CartManager.getTotalPrice();
  }

  get shippingFee(): number {
    return this.subtotal > 0 ? 0 : 0;
  }

  get total(): number {
    return this.subtotal + this.shippingFee;
  }

  get cashAmount(): number {
    return Number(this.checkoutForm.value.cashAmount || 0);
  }

  get changeDue(): number {
    return Math.max(this.cashAmount - this.total, 0);
  }

  get totalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  adjustQuantity(productId: string, delta: number): void {
    const item = this.cartItems.find(entry => entry.product.id === productId);
    if (!item) {
      return;
    }

    const nextQuantity = item.quantity + delta;
    if (nextQuantity <= 0) {
      this.CartManager.removeFromCart(productId);
      return;
    }

    this.CartManager.updateQuantity(productId, nextQuantity);
  }

  removeItem(productId: string): void {
    this.CartManager.removeFromCart(productId);
  }

  toggleShipping(): void {
    this.isShippingOpen = !this.isShippingOpen;
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'Please sign in again to place your order.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const form = this.checkoutForm.value;

    const shippingAddr = [
      form.addressLine1,
      form.addressLine2,
      form.city,
      form.state,
      form.postalCode,
    ]
      .filter(Boolean)
      .join(', ');

    const cash = Number(form.cashAmount || 0);
    
    this.orderManager.placeOrder(user.id, this.cartItems, shippingAddr).subscribe({
      next: (order) => {

        // ✅ If no cash payment needed
        if (cash <= 0) {
          this.CartManager.refreshCart();
          this.isSubmitting = false;
          this.router.navigate(['/orders']);
          return;
        }

        // ✅ Cash payment flow
        this.paymentManager.checkoutPayment({
          order_id: order.id,
          payment_method: 'cash',
          cash: cash
        }).subscribe({
          next: (result: any) => {
            this.toastManager.success(result.message || 'Payment successful');
            this.CartManager.refreshCart();
            this.isSubmitting = false;
            this.router.navigate(['/orders']);
          },

          error: (error: any) => {
            this.toastManager.error(error?.message || 'Payment failed');
            this.isSubmitting = false;
          }
        });

      },

      error: (error: any) => {
        this.isSubmitting = false;
        this.errorMessage =
          error?.error?.message || error?.message || 'Failed to place order';
      }
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
