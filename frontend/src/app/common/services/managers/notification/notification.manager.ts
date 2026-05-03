import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  private setNotifications(notifications: NotificationDTO[]): void {
    this.notificationsSubject.next(notifications);
    this.notifCountSubject.next(notifications.filter(n => !n.is_read).length);
  }

  load(): void {
    const role = this.auth.getRole();
    if (role === 'admin') {
      this.refresh(this.api.getAdminNotifications());
    } else if (role === 'customer') {
      this.refresh(this.api.getUserNotifications());
    }
    console.log('NotificationManager loaded for role:', role);
  }

  refresh(notifications$: Observable<NotificationDTO[]>): void {
    notifications$.subscribe({
      next: (notifs) => {
        this.setNotifications(notifs);
        this.isLoaded = true;
      },
      error: (err) => console.error('Failed to load notifications:', err)
    });
  }

  getNotifications(): Observable<NotificationDTO[]> {
    return this.notifications$;
  }

  createNotification(data: CreateNotificationRequestDTO): void {
    this.api.createNotification(data).pipe(
      tap(newNotif => {
        const updatedList = [...this.notificationsSubject.value, newNotif];
        this.notificationsSubject.next(updatedList);
      })
    )
  }

  markAsRead(id: number | string): void {
    this.api.markAsRead(id).subscribe({
      next: (updated) => {
        const updatedList = this.notificationsSubject.value.map(n =>
          n.id === updated.id ? updated : n
        );
        this.setNotifications(updatedList);
      },
      error: (err) => console.error(err)
    });
  }

  markAllAsRead(): void {
    this.api.markAllAsRead().subscribe({
      next: () => {
        const updatedList = this.notificationsSubject.value.map(n => ({
          ...n,
          is_read: true,
        }));
        this.setNotifications(updatedList);
      },
      error: (err) => console.error(err)
    });
  }

  deleteNotification(id: number | string): void {
    this.api.deleteNotification(id).subscribe({
      next: () => {
        const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
        this.setNotifications(filtered);
      },
      error: (err) => console.error(err)
    });
  }

  deleteAllNotifications(): void {
    this.api.deleteAllNotifications().subscribe({
      next: () => {
        this.setNotifications([]);
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
