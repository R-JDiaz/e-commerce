import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@common/services/managers/auth/auth';
import { Toast } from '@common/components/toast/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, Toast],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginType: 'user' | 'admin' = 'user';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'error';

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.routeByUserType(user);
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.showToast = true;
      this.toastMessage = 'Please fill in all fields';
      this.toastType = 'error';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password, this.loginType).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        this.routeByUserType(user);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.showToast = true;
        this.toastMessage = error.message || 'Login failed';
        this.toastType = 'error';
      }
    });
  }

  private routeByUserType(user: User): void {
    if (user.type === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.router.navigate(['/user-dashboard']);
  }
}
