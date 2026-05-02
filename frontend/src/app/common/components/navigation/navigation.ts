import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationComponent } from '@common/components/notification/notification';
import { NotificationManager } from '@common/services/managers/notification/notification.manager';
import { Observable } from 'rxjs';

export type NavigationContext = 'landing' | 'dashboard' | 'orders' | 'profile' | 'checkout' | 'admin';

interface NavigationLink {
  label: string;
  href: string;
  route: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationComponent],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class NavigationComponent implements OnInit{
  @Input() context: NavigationContext = 'dashboard';
  @Input() userId!: number; // 🔥 needed for notifications
  @Output() logout = new EventEmitter<void>();
  
  notifCount$! : Observable<number>;

  mobileOpen = false;
  notifOpen = false; // 🔔 toggle dropdown

  constructor(private notifManager: NotificationManager) {}

  ngOnInit(): void {
    this.notifCount$ = this.notifManager.getUnreadCount();
  }

  toggleMobileMenu(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobileMenu(): void {
    this.mobileOpen = false;
  }

  toggleNotifications(): void {
    this.notifOpen = !this.notifOpen;
  }

  get links(): NavigationLink[] {
    switch (this.context) {
      case 'landing':
        return [
          { label: 'Home', href: '#home', route: false },
          { label: 'Featured', href: '#featured', route: false },
          { label: 'About', href: '#about', route: false },
          { label: 'Contact', href: '#contact', route: false },
        ];
      case 'orders':
        return [
          { label: 'Dashboard', href: '/user-dashboard', route: true },
          { label: 'Profile', href: '/profile', route: true },
          { label: 'Checkout', href: '/checkout', route: true },
        ];
      case 'profile':
        return [
          { label: 'Dashboard', href: '/user-dashboard', route: true },
          { label: 'Orders', href: '/orders', route: true },
          { label: 'Checkout', href: '/checkout', route: true },
        ];
      case 'checkout':
        return [
          { label: 'Dashboard', href: '/user-dashboard', route: true },
          { label: 'Orders', href: '/orders', route: true },
          { label: 'Profile', href: '/profile', route: true },
        ];
      case 'admin':
        return [];
      case 'dashboard':
      default:
        return [
          { label: 'Orders', href: '/orders', route: true },
          { label: 'Profile', href: '/profile', route: true },
          { label: 'Checkout', href: '/checkout', route: true },
        ];
    }
  }

  get brandNote(): string {
    switch (this.context) {
      case 'landing':
        return 'Fresh coffee, easy mornings.';
      case 'admin':
        return 'Management view.';
      default:
        return 'Your cafe account.';
    }
  }

  get actionLabel(): string | null {
    return this.context === 'landing' ? 'Login' : null;
  }

  get showLogout(): boolean {
    return this.context !== 'landing';
  }


}