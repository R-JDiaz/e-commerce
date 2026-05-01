import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductListItem } from '@common/models/product';
import { ProductManager } from '@common/services/managers/product/product';
import { Order, OrderManager } from '@common/services/managers/order/order';
import { Auth } from '@common/services/managers/auth/auth';
import { NavigationComponent } from '@common/components/navigation/navigation';
import { AdminSiteLinksComponent } from './site-links/site-links';

import { AdminAnalyticsComponent } from './analytics/analytics';
import { AdminOrdersComponent } from './orders/orders';
import { AdminProductsComponent } from './products/products';
import { AdminSettingsComponent } from './settings/settings';
import { AdminUsersComponent } from './users/users';

type AdminSection = 'analytics' | 'products' | 'orders' | 'users' | 'settings' | 'site-links';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    AdminAnalyticsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    AdminSiteLinksComponent,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  products: ProductListItem[] = [];
  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  activeSection: AdminSection = 'analytics';

  totalSales = 12345;
  ordersToday = 156;
  activeUsers = 2847;
  avgOrderValue = 24.5;

  constructor(
    private productService: ProductManager,
    private orderManager: OrderManager,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  setSection(section: AdminSection): void {
    this.activeSection = section;
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: ProductListItem[]) => {
        this.products = products;
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      },
    });
  }

  reloadProducts(): void {
    this.loadProducts();
  }

  loadOrders() {
    this.orderManager.getAllOrders().subscribe({
      next: (orders: any) => {
        this.orders = orders;
        this.updateAnalytics();
      },
      error: (error: any) => {
        console.error('Failed to load orders', error);
      },
    });
  }

  updateAnalytics() {
    this.totalSales = this.orders.reduce((sum, order) => sum + order.total, 0);
    this.ordersToday = this.orders.filter(order =>
      new Date(order.createdAt).toDateString() === new Date().toDateString()
    ).length;
    this.avgOrderValue = this.orders.length > 0 ? this.totalSales / this.orders.length : 0;
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.orderManager.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error: any) => {
        this.errorMessage = error ?? 'Failed to update order status';
      },
    });
  }

  updateUserStatus(userId: string, status: 'active' | 'suspended'): void {
    this.errorMessage = `User ${userId} marked as ${status}.`;
  }

  logout() {
    this.orderManager.clearState();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
