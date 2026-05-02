import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  NotificationApiService,
  NotificationDTO,
  CreateNotificationRequestDTO
} from '@common/services/api/notification/notification-api.service';
import { AuthManager } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class NotificationManager {
  private isLoaded = false;

  private readonly notificationsSubject = new BehaviorSubject<NotificationDTO[]>([]);
  readonly notifications$ = this.notificationsSubject.asObservable();

  private readonly notifCountSubject = new BehaviorSubject<number>(0);
  readonly notifCount$ = this.notifCountSubject.asObservable();


  constructor(private api: NotificationApiService, private auth: AuthManager) {}

  load(): void {
    console.log(this.auth.role);
    if (this.auth.role === 'admin') {
      this.refresh(this.api.getAdminNotifications());
    } else {
      this.refresh(this.api.getUserNotifications());
    }
  }

  refresh(notifications$: Observable<NotificationDTO[]>): void {
    notifications$.subscribe({
      next: (notifs) => {
        this.notificationsSubject.next(notifs);
        this.notifCountSubject.next(notifs.filter(n => !n.is_read).length);
        this.isLoaded = true;
      },
      error: (err) => console.error('Failed to load notifications:', err)
    });
  }

  getNotifications(): Observable<NotificationDTO[]> {
    return this.notifications$;
  }

  createNotification(data: CreateNotificationRequestDTO): void {
    this.api.createNotification(data).subscribe({
      next: (notif) => {
        const current = this.notificationsSubject.value;
        this.notificationsSubject.next([notif, ...current]);
      },
      error: (err) => console.error(err)
    });
  }

  markAsRead(id: number | string): void {
    this.api.markAsRead(id).subscribe({
      next: (updated) => {
        const updatedList = this.notificationsSubject.value.map(n =>
          n.id === updated.id ? updated : n
        );
        this.notificationsSubject.next(updatedList);
      },
      error: (err) => console.error(err)
    });
  }

  deleteNotification(id: number | string): void {
    this.api.deleteNotification(id).subscribe({
      next: () => {
        const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
        this.notificationsSubject.next(filtered);
      },
      error: (err) => console.error(err)
    });
  }

  getUnreadCount(): Observable<number> {
    const count = this.notificationsSubject.value.filter(n => !n.is_read).length;
    console.log('Unread notifications count:', count);
    return this.notifCount$;
  }

  clearNotifications(): void {
    this.isLoaded = false;
    this.notificationsSubject.next([]);
    this.notifCountSubject.next(0);
  }
}