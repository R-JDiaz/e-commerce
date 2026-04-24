import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize, switchMap, timer } from 'rxjs';
import { Auth, User } from '@common/services/managers/auth/auth';
import { ToastManager } from '@common/components/toast-container/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginType: 'user' | 'admin' = 'user';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  loadingMessage = 'Signing in...';

  constructor(
    private router: Router, 
    private authService: Auth, 
    private toastManager: ToastManager) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.routeByUserType(user);
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.toastManager.error('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Signing in...';

     this.authService.login(this.email, this.password, this.loginType).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (user: User) => {
        this.toastManager.success('Login successful');
        setTimeout(() => {
          this.routeByUserType(user);
        }, 700);
      },
      error: (error: any) => {
        this.toastManager.error(
          error.error.errors[0] || 'Login failed',
        );
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
