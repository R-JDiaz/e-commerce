import { Injectable } from '@angular/core';
import { ProductListItem } from '@common/models/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  CartApiService,
  CartDetail,
  CartProductItem,
} from '@common/services/api/cart/cart-api.service';

export interface CartItem {
  product: ProductListItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartManager {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  public totalItems$ = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );
  public totalPrice$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );

  constructor(private api: CartApiService) {
    this.loadCachedCart();
    this.refreshCart();
    this.bindAuthEvents();
  }

  private mapApiProduct(item: CartProductItem): ProductListItem {
    return {
      id: String(item.id ?? item.product_id ?? ''),
      name: item.name,
      description: null,
      price: Number(item.price ?? 0),
      stock: 0,
      category_name: '',
      image_url: item.image_url,
    };
  }

  private mapCartDetail(detail: CartDetail): CartItem[] {
    return detail.products.map(item => ({
      product: this.mapApiProduct(item),
      quantity: Number(item.quantity ?? 0),
    }));
  }

  private setCartItems(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.saveToStorage();
  }

  private normalizeCartItems(items: CartItem[]): CartItem[] {
    return items.map(item => ({
      product: {
        ...item.product,
        price: Number(item.product?.price ?? 0),
      },
      quantity: Number(item.quantity ?? 0),
    }));
  }

  private updateLocalCart(mutator: (items: CartItem[]) => CartItem[]): void {
    const nextItems = mutator([...this.cartItemsSubject.value]);
    this.setCartItems(nextItems);
  }

  private refreshCart(): void {
    if (!this.hasAccessToken()) {
      this.clearLocalCart();
      return;
    }

    this.api.getCart().subscribe({
      next: cart => {
        const items = this.normalizeCartItems(this.mapCartDetail(cart));
        this.setCartItems(items);
      },
      error: () => {
        // Keep the cached cart if the API is unavailable.
      }
    });
  }

  private loadCachedCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) {
      return;
    }

    try {
      this.cartItemsSubject.next(this.normalizeCartItems(JSON.parse(storedCart)));
    } catch {
      localStorage.removeItem('cart');
    }
  }

  private bindAuthEvents(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('auth:logout', this.handleLogout);
    window.addEventListener('auth:session-changed', this.handleSessionChanged);
  }

  private handleLogout = (): void => {
    this.clearLocalCart();
  };

  private handleSessionChanged = (): void => {
    this.cartItemsSubject.next([]);
    this.refreshCart();
  };

  addToCart(product: ProductListItem, quantity: number = 1): void {
    if (quantity <= 0) {
      return;
    }

    this.api.addItem({
      productId: product.id,
      quantity,
    }).subscribe({
      next: cart => {
        this.setCartItems(this.normalizeCartItems(this.mapCartDetail(cart)));
      },
      error: () => {
        this.updateLocalCart(items => {
          const existing = items.find(item => item.product.id === product.id);
          if (existing) {
            return items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [...items, { product, quantity }];
        });
      }
    });
  }

  removeFromCart(productId: string): void {
    this.api.removeItem(productId, { productId }).subscribe({
      next: cart => {
        this.setCartItems(this.normalizeCartItems(this.mapCartDetail(cart)));
      },
      error: () => {
        this.updateLocalCart(items => items.filter(item => item.product.id !== productId));
      }
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.api.updateItem(productId, { productId, quantity }).subscribe({
      next: cart => {
        this.setCartItems(this.normalizeCartItems(this.mapCartDetail(cart)));
      },
      error: () => {
        this.updateLocalCart(items =>
          items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalItems(): Observable<number> {
    return this.totalItems$;
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clearCart(): void {
    this.api.clearCart().subscribe({
      next: () => {
        this.clearLocalCart();
      },
      error: () => {
        this.clearLocalCart();
      }
    });
  }

  private saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }

  private clearLocalCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  private hasAccessToken(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
}
