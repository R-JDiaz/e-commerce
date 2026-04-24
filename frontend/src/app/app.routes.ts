import { Routes } from '@angular/router';
import { AdminDashboard } from '@features/admin-dashboard/admin-dashboard';
import { Checkout } from '@features/user-dashboard/checkout/checkout';
import { Landing } from '@features/landing/landing';
import { Login } from '@features/auth/login/login';
import { Signup } from '@features/auth/signup/signup';
import { Orders } from '@features/user-dashboard/orders/orders';
import { Profile } from '@features/user-dashboard/profile/profile';
import { UserDashboard } from '@features/user-dashboard/user-dashboard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'checkout', component: Checkout },
  { path: 'orders', component: Orders },
  { path: 'profile', component: Profile },
  { path: 'admin-dashboard', component: AdminDashboard },
];
