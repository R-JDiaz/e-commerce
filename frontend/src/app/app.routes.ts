import { Routes } from '@angular/router';
import { AdminDashboard } from '@features/admin-dashboard/admin-dashboard';
import { Landing } from '@features/landing/landing';
import { Login } from '@features/login/login';
import { UserDashboard } from '@features/user-dashboard/user-dashboard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },
];
