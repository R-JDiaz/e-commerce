import { Routes } from '@angular/router';
import { AdminDashboard } from '@features/admin-dashboard/admin-dashboard';
import { Checkout } from '@features/checkout/checkout';
import { Landing } from '@features/landing/landing';
import { Login } from '@features/login/login';
import { Orders } from '@features/orders/orders';
import { Profile } from '@features/profile/profile';
import { UserDashboard } from '@features/user-dashboard/user-dashboard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'checkout', component: Checkout },
  { path: 'orders', component: Orders },
  { path: 'profile', component: Profile },
  { path: 'admin-dashboard', component: AdminDashboard },
];
