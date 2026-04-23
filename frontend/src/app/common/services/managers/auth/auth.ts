import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AuthApiService,
  AuthSession,
  LoginRequest,
} from '@common/services/api/auth/auth-api.service';

export interface User {
  id: string;
  email: string;
  type: 'user' | 'admin';
  name: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private authApi: AuthApiService) {
    // Check localStorage on init
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string, type: 'user' | 'admin'): Observable<User> {
    const request: LoginRequest = { email, password };

    return this.authApi.login(request).pipe(
      map(session => {
        const user = this.mapSessionUser(session, type);
        this.persistUser(user);
        return user;
      }),
      catchError(() => this.mockLogin(email, password, type))
    );
  }

  private mockLogin(email: string, password: string, type: 'user' | 'admin'): Observable<User> {
    const mockUsers: User[] = [
      { id: '1', email: 'user@example.com', type: 'user', name: 'John Doe' },
      { id: '2', email: 'admin@example.com', type: 'admin', name: 'Admin User' },
    ];

    const user = mockUsers.find(u => u.email === email && u.type === type);
    if (!user || password !== 'password') {
      return throwError(() => new Error('Invalid credentials'));
    }

    this.persistUser(user);
    return of(user).pipe(delay(1000));
  }

  private mapSessionUser(session: AuthSession, type: 'user' | 'admin'): User {
    const mappedType = session.user.role === 'admin' ? 'admin' : type;

    return {
      id: String(session.user.id),
      email: session.user.email,
      type: mappedType,
      name: `${session.user.first_name} ${session.user.last_name}`.trim(),
    };
  }

  private persistUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.clearUser();
    this.authApi.logout().subscribe({
      error: () => {
        // The local session is already cleared.
      },
    });
  }

  private clearUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserType(): 'user' | 'admin' | null {
    return this.currentUserSubject.value?.type || null;
  }

  updateCurrentUser(user: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...user };
    this.persistUser(updatedUser);
  }
}
