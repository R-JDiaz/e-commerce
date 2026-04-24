import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize, switchMap, timer } from 'rxjs';
import { Auth, User } from '@common/services/managers/auth/auth';
import { Toast } from '@common/components/toast/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, Toast],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginType: 'user' | 'admin' = 'user';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  loadingMessage = 'Signing in...';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  private readonly loadingDelayMs = 200;
  private requestTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private navigationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private router: Router, private authService: Auth, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.routeByUserType(user);
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.showNotification('Please fill in all fields', 'error');
      return;
    }

    this.clearTimers();
    this.isLoading = true;
    this.loadingMessage = 'Signing in...';

     timer(this.loadingDelayMs).pipe(
      switchMap(() =>
        this.authService.login(this.email, this.password, this.loginType)
      ),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (user: User) => {
        this.showNotification('Login successful', 'success');

        // Delay navigation slightly for UX
        this.navigationTimeoutId = setTimeout(() => {
          this.routeByUserType(user);
        }, 700);
      },
      error: (error: any) => {
        this.showNotification(
          this.getErrorMessage(error) || 'Login failed',
          'error'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private routeByUserType(user: User): void {
    if (user.type === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.router.navigate(['/user-dashboard']);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    this.showToast = false;
    this.toastMessage = message;
    this.toastType = type;
    queueMicrotask(() => {
      this.showToast = true;
      this.cdr.detectChanges();
    });
  }

  private getErrorMessage(error: any): string {
    let backendMessage: string;

    if (error.error.errors) {
      backendMessage = error.error.errors[0];
    } else {
      backendMessage = error.message;
    }
    

    if (typeof backendMessage === 'string' && backendMessage.trim().length > 0) {
      return backendMessage;
    }

    if (Array.isArray(error?.error?.errors) && error.error.errors.length > 0) {
      return error.error.errors[0];
    }

    if (typeof error?.message === 'string' && error.message.trim().length > 0) {
      return error.message;
    }

    return 'Login failed';
  }

  private clearTimers(): void {
    if (this.requestTimeoutId) {
      clearTimeout(this.requestTimeoutId);
      this.requestTimeoutId = null;
    }

    if (this.navigationTimeoutId) {
      clearTimeout(this.navigationTimeoutId);
      this.navigationTimeoutId = null;
    }
  }
}
