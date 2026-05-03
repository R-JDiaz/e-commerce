import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NavigationComponent } from '@common/components/navigation/navigation';
import { AnalyticsData, AnalyticsManager } from '@common/services/managers/analytics/analytics';
import { AuthManager } from '@common/services/managers/auth/auth';
import { NotificationManager } from '@common/services/managers/notification/notification.manager';
import { ProductListItem } from '@common/models/product';
import { ProductManager } from '@common/services/managers/product/product';
import { OrderManager } from '@common/services/managers/order/order';
import { AdminSiteLinksComponent } from './site-links/site-links';
import { AdminChatSupportComponent } from './chat-support/chat-support';
import { AdminCommandCenterComponent } from './command-center/admin-command-center';
import { AdminContentHeroComponent } from './content-hero/admin-content-hero';
import { AdminSection } from './admin-dashboard.types';

import { AdminAnalyticsComponent } from './analytics/analytics';
import { AdminOrdersComponent } from './orders/orders';
import { AdminProductsComponent } from './products/products';
import { AdminSettingsComponent } from './settings/settings';
import { AdminUsersComponent } from './users/users';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    AdminCommandCenterComponent,
    AdminContentHeroComponent,
    AdminAnalyticsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    AdminSiteLinksComponent,
    AdminChatSupportComponent,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  products: ProductListItem[] = [];
  analytics$!: Observable<AnalyticsData>;

  isLoading = false;
  errorMessage = '';
  showNavigation = true;

  activeSection: AdminSection = 'analytics';

  constructor(
    private productService: ProductManager,
    private orderManager: OrderManager,
    private analyticsManager: AnalyticsManager,
    private notifManager: NotificationManager,
    private authService: AuthManager,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notifManager.load();
    this.orderManager.adminLoad();
    this.analyticsManager.init();
    this.analytics$ = this.analyticsManager.analytics$;
    this.loadProducts();
  }

  setSection(section: AdminSection): void {
    this.activeSection = section;
  }

  onContentScroll(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    this.showNavigation = target.scrollTop <= 8;
  }

  get activeSectionLabel(): string {
    switch (this.activeSection) {
      case 'analytics':
        return 'Analytics';
      case 'products':
        return 'Products';
      case 'orders':
        return 'Orders';
      case 'users':
        return 'Users';
      case 'settings':
        return 'Settings';
      case 'site-links':
        return 'Footer Links';
      case 'chat-support':
        return 'Chat Support';
      default:
        return 'Analytics';
    }
  }

  get activeSectionDescription(): string {
    switch (this.activeSection) {
      case 'analytics':
        return 'Watch sales, order volume, and store activity from a calm control room.';
      case 'products':
        return 'Review the catalog, edit product details, and keep the menu fresh.';
      case 'orders':
        return 'Process incoming orders with a faster workflow.';
      case 'users':
        return 'Check customer access and roles.';
      case 'settings':
        return 'Update admin security settings.';
      case 'site-links':
        return 'Manage footer links and branding.';
      case 'chat-support':
        return 'Respond to customer questions and close resolved chats.';
      default:
        return 'Monitor the coffee shop dashboard.';
    }
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProducts().subscribe({
      next: (products: ProductListItem[]) => {
        this.products = products;
        this.isLoading = false;
        this.errorMessage = '';
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

  updateOrderStatus(
    orderId: string,
    status: 'pending' | 'accepted' | 'paid' | 'shipped' | 'completed' | 'cancelled' | 'refund'
  ): void {
    this.orderManager.updateOrderStatus(orderId, status).subscribe({
      next: () => {},
      error: (error: unknown) => {
        this.errorMessage = error ? String(error) : 'Failed to update order status';
      },
    });
  }

  updateUserStatus(userId: string, status: 'active' | 'suspended'): void {
    this.errorMessage = `User ${userId} marked as ${status}.`;
  }

  logout(): void {
    this.notifManager.clearNotifications();
    this.orderManager.clearState();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
