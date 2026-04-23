import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product, ProductListItem } from '@common/models/product';
import { CartItem, CartService } from '@common/services/managers/cart/cart';
import { Order, OrderService } from '@common/services/managers/order/order';
import { ProductService } from '@common/services/managers/product/product';
import { Auth } from '@common/services/managers/auth/auth';
import { Products } from '../products/products';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormsModule, Products],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit, OnDestroy {
  products: ProductListItem[] = [];
  filteredProducts: ProductListItem[] = [];
  cartItems: CartItem[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  isLoading: boolean = false;
  errorMessage: string = '';
  orderHistory: Order[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: Auth,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCart();
    this.loadOrderHistory();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  loadCart() {
    this.cartService.cartItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.cartItems = items;
    });
  }

  loadOrderHistory() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.orderService.getUserOrders(user.id).subscribe({
        next: (orders) => {
          this.orderHistory = orders;
        },
        error: (error) => {
          console.error('Failed to load order history', error);
        }
      });
    }
  }

  onSearch(query: string) {
    this.searchQuery = query;
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe({
        next: (products) => {
          this.filteredProducts = products;
        },
        error: (error) => {
          this.errorMessage = 'Search failed';
        }
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.productService.filterByCategory(category).subscribe({
      next: (products) => {
        this.filteredProducts = products;
      },
      error: (error) => {
        this.errorMessage = 'Filter failed';
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  checkout() {
    const user = this.authService.getCurrentUser();
    if (user && this.cartItems.length > 0) {
      this.orderService.placeOrder(user.id, this.cartItems).subscribe({
        next: (order) => {
          this.cartService.clearCart();
          alert('Order placed successfully!');
          this.loadOrderHistory();
        },
        error: (error) => {
          this.errorMessage = 'Failed to place order';
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
