import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth, User } from '@common/services/managers/auth/auth';
import { NavigationComponent } from '@common/components/navigation/navigation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavigationComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})

export class Profile implements OnInit {
  profileForm!: FormGroup;
  isSaving = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      postalCode: [''],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      addressLine1: user.addressLine1 ?? '',
      addressLine2: user.addressLine2 ?? '',
      city: user.city ?? '',
      state: user.state ?? '',
      postalCode: user.postalCode ?? '',
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const value = this.profileForm.value;

    this.authService.updateCurrentUser({
      name: value.name ?? '',
      email: value.email ?? '',
      phone: value.phone ?? '',
      addressLine1: value.addressLine1 ?? '',
      addressLine2: value.addressLine2 ?? '',
      city: value.city ?? '',
      state: value.state ?? '',
      postalCode: value.postalCode ?? '',
    } as Partial<User>);

    this.isSaving = false;
    this.message = 'Profile updated';
  }

  backToShop(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
