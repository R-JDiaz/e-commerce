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

interface StoredAuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly userStorageKey = 'currentUser';
  private readonly tokenStorageKey = 'authTokens';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private authApi: AuthApiService) {
    this.restoreSession();
  }

  login(email: string, password: string, type: 'user' | 'admin'): Observable<User> {
    const request: LoginRequest = { email, password };

    return this.authApi.login(request).pipe(
      map(session => {
        const user = this.mapSessionUser(session, type);
        this.persistSession(user, session.access_token, session.refresh_token);
        return user;
      }),
      catchError(error => {
        const status = typeof error?.status === 'number' ? error.status : null;
        if (status === 404 || status === 0) {
          return this.mockLogin(email, password, type);
        }

        return throwError(() => error);
      })
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

    this.persistSession(user, null, null);
    return of(user).pipe(delay(1000));
  }

  private mapSessionUser(session: AuthSession, type: 'user' | 'admin'): User {
    const mappedType =
      session.user.role === 'admin'
        ? 'admin'
        : session.user.role === 'customer'
          ? 'user'
          : type;

    return {
      id: String(session.user.id),
      email: session.user.email,
      type: mappedType,
      name: `${session.user.first_name} ${session.user.last_name}`.trim(),
    };
  }

  private persistSession(user: User, accessToken: string | null, refreshToken: string | null): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
    const tokens: StoredAuthTokens = { accessToken, refreshToken };
    localStorage.setItem(this.tokenStorageKey, JSON.stringify(tokens));
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.clearSession();
    this.authApi.logout().subscribe({
      error: () => {
        // The local session is already cleared.
      },
    });
  }

  clearSession(): void {
    localStorage.removeItem(this.userStorageKey);
    localStorage.removeItem(this.tokenStorageKey);
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUserSubject.next(null);
  }

  private restoreSession(): void {
    const storedUser = localStorage.getItem(this.userStorageKey);
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch {
        this.currentUserSubject.next(null);
      }
    }

    const storedTokens = localStorage.getItem(this.tokenStorageKey);
    if (storedTokens) {
      try {
        const parsed = JSON.parse(storedTokens) as StoredAuthTokens;
        this.accessToken = parsed.accessToken ?? null;
        this.refreshToken = parsed.refreshToken ?? null;
      } catch {
        this.accessToken = null;
        this.refreshToken = null;
      }
    }
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

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  updateCurrentUser(user: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...user };
    this.persistSession(updatedUser, this.accessToken, this.refreshToken);
  }
}
