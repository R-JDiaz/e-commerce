import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type NavigationContext = 'landing' | 'dashboard' | 'orders' | 'profile' | 'checkout' | 'admin';

interface NavigationLink {
  label: string;
  href: string;
  route: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class NavigationComponent {
  @Input() context: NavigationContext = 'dashboard';
  @Output() logout = new EventEmitter<void>();

  mobileOpen = false;

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

  toggleMobileMenu(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobileMenu(): void {
    this.mobileOpen = false;
  }
}
