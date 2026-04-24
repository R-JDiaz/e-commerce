import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Toast } from '@common/components/toast/toast';
import { Auth, User } from '@common/services/managers/auth/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Toast],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'error';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.routeByUserType(user);
    }
  }

  onSubmit(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      this.showError('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }

    this.isLoading = true;

    this.authService.register({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        this.routeByUserType(user);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.showError(error.message || 'Sign up failed');
      },
    });
  }

  private showError(message: string): void {
    this.showToast = true;
    this.toastMessage = message;
    this.toastType = 'error';
  }

  private routeByUserType(user: User): void {
    if (user.type === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.router.navigate(['/user-dashboard']);
  }
}
