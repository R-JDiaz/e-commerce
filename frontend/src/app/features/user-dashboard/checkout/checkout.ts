import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartItem, CartService } from '@common/services/managers/cart/cart';
import { Auth } from '@common/services/managers/auth/auth';
import { OrderService } from '@common/services/managers/order/order';
import { NavigationComponent } from '@common/components/navigation/navigation';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavigationComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isSubmitting = false;
  errorMessage = '';
  checkoutForm: FormGroup;

  readonly paymentMethods = [
    { value: 'card', label: 'Debit / Credit Card' },
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'gcash', label: 'GCash' },
  ] as const;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: Auth,
    private orderService: OrderService,
    private router: Router
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
      paymentMethod: ['card', [Validators.required]],
      cardName: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => this.cartItems = items);

    const user = this.authService.getCurrentUser();
    if (user) {
      this.checkoutForm.patchValue({
        fullName: user.name,
        email: user.email,
      });
    }

    this.checkoutForm.get('paymentMethod')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(method => {
        this.syncPaymentValidators(method ?? 'card');
      });

    this.syncPaymentValidators(this.checkoutForm.value.paymentMethod ?? 'card');

    if (this.cartItems.length === 0) {
      this.router.navigate(['/user-dashboard']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get subtotal(): number {
    return this.cartService.getTotalPrice();
  }

  get shippingFee(): number {
    return this.subtotal > 0 ? 0 : 0;
  }

  get total(): number {
    return this.subtotal + this.shippingFee;
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

    const shippingAddr = [
      this.checkoutForm.value.addressLine1,
      this.checkoutForm.value.addressLine2,
      this.checkoutForm.value.city,
      this.checkoutForm.value.state,
      this.checkoutForm.value.postalCode,
    ]
      .filter(Boolean)
      .join(', ');

    this.orderService.placeOrder(user.id, this.cartItems, shippingAddr).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.isSubmitting = false;
        this.router.navigate(['/user-dashboard']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to place order';
      },
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private syncPaymentValidators(method: string): void {
    const cardFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv'] as const;

    cardFields.forEach(field => {
      const control = this.checkoutForm.get(field);
      if (!control) return;

      if (method === 'card') {
        const validators = field === 'cardName'
          ? [Validators.required, Validators.minLength(3)]
          : field === 'cardNumber'
            ? [Validators.required, Validators.minLength(12), Validators.maxLength(19)]
            : field === 'expiryDate'
              ? [Validators.required]
              : [Validators.required, Validators.minLength(3), Validators.maxLength(4)];
        control.setValidators(validators);
      } else {
        control.clearValidators();
      }

      control.updateValueAndValidity({ emitEvent: false });
    });
  }
}
