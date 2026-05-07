import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, tap } from 'rxjs';
import {
  SupportApiService,
  SupportMessageDTO,
  SupportMessageRequestDTO,
  SupportThreadDTO,
} from '@common/services/api/support/support-api.service';
import { AuthManager } from '../auth/auth';

const VISITOR_KEY_STORAGE = 'supportVisitorKey';

@Injectable({
  providedIn: 'root',
})
export class SupportManager {
  private readonly threadsSubject = new BehaviorSubject<SupportThreadDTO[]>([]);
  readonly threads$ = this.threadsSubject.asObservable();

  private readonly activeThreadSubject = new BehaviorSubject<SupportThreadDTO | null>(null);
  readonly activeThread$ = this.activeThreadSubject.asObservable();

  private readonly currentUserSubject = new BehaviorSubject<SupportThreadDTO | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private api: SupportApiService,
    private auth: AuthManager
  ) {}

  loadCustomerThread(): Observable<SupportThreadDTO | null> {
    const source$ = this.isAuthenticatedCustomer()
      ? this.api.getMyThread()
      : this.api.getVisitorThread(this.getVisitorKey());

    return source$.pipe(
      tap((thread) => this.setActiveThread(thread))
    );
  }

  sendCustomerMessage(message: string): Observable<SupportThreadDTO> {
    const cleaned = message.trim();
    if (!cleaned) {
      return throwError(() => new Error('Message is required'));
    }

    const payload: SupportMessageRequestDTO = { message: cleaned };
    const source$ = this.isAuthenticatedCustomer()
      ? this.api.sendMyMessage(payload)
      : this.api.sendVisitorMessage(this.getVisitorKey(), payload);

    return source$.pipe(
      tap((thread) => this.setActiveThread(thread))
    );
  }

  loadAdminThreads(): Observable<SupportThreadDTO[]> {
    return this.api.getAdminThreads().pipe(
      tap((threads) => {
        this.threadsSubject.next(threads);
        this.activeThreadSubject.next(threads[0] ?? null);
      })
    );
  }

  selectAdminThread(threadId: number | string): Observable<SupportThreadDTO> {
    return this.api.getAdminThread(threadId).pipe(
      tap((thread) => this.setActiveThread(thread))
    );
  }

  replyToThread(threadId: number | string, message: string): Observable<SupportThreadDTO> {
    const cleaned = message.trim();
    if (!cleaned) {
      return throwError(() => new Error('Message is required'));
    }

    return this.api.replyAdminThread(threadId, { message: cleaned }).pipe(
      tap((thread) => this.syncThread(thread))
    );
  }

  markThreadRead(threadId: number | string): Observable<SupportThreadDTO> {
    return this.api.markAdminThreadRead(threadId).pipe(
      tap((thread) => this.syncThread(thread))
    );
  }

  closeThread(threadId: number | string): Observable<SupportThreadDTO> {
    return this.api.closeAdminThread(threadId).pipe(
      tap((thread) => this.syncThread(thread))
    );
  }

  getCurrentThread(): SupportThreadDTO | null {
    return this.activeThreadSubject.value;
  }

  getUnreadCount(thread: SupportThreadDTO | null): number {
    return thread?.unread_count ?? 0;
  }

  getLastCustomerMessage(thread: SupportThreadDTO | null): SupportMessageDTO | null {
    if (!thread) {
      return null;
    }

    const customerMessages = thread.messages.filter((message) => message.sender === 'customer');
    return customerMessages[customerMessages.length - 1] ?? null;
  }

  getLastMessage(thread: SupportThreadDTO | null): SupportMessageDTO | null {
    if (!thread) {
      return null;
    }

    return thread.messages[thread.messages.length - 1] ?? null;
  }

  private setActiveThread(thread: SupportThreadDTO | null): void {
    this.activeThreadSubject.next(thread);
    if (thread) {
      this.syncThread(thread);
    }
  }

  private syncThread(thread: SupportThreadDTO): void {
    this.activeThreadSubject.next(thread);

    const threads = this.threadsSubject.value;
    const nextThreads = threads.some((item) => item.id === thread.id)
      ? threads.map((item) => (item.id === thread.id ? thread : item))
      : [thread, ...threads];

    this.threadsSubject.next(nextThreads);
  }

  private isAuthenticatedCustomer(): boolean {
    return this.auth.getRole() === 'customer';
  }

  private getVisitorKey(): string {
    if (typeof window === 'undefined') {
      return 'server-visitor';
    }

    const stored = localStorage.getItem(VISITOR_KEY_STORAGE);
    if (stored) {
      return stored;
    }

    const nextValue = `visitor-${crypto.randomUUID()}`;
    localStorage.setItem(VISITOR_KEY_STORAGE, nextValue);
    return nextValue;
  }

  logoutOrSwitchAccount(): void {
  this.resetSupportState();
  this.auth.logout?.();
}

  public resetSupportState(): void {
    this.threadsSubject.next([]);
    this.activeThreadSubject.next(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(VISITOR_KEY_STORAGE);
    }
  }
  }
