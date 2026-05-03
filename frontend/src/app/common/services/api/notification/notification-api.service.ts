import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface NotificationDTO {
  id: number;
  type: 'order' | 'payment' | 'system';
  target_role: 'customer' | 'admin';
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface CreateAdminNotificationDTO {
  target_role: 'admin';
  type: 'order' | 'payment' | 'system';
  message: string;
}

export interface CreateUserNotificationDTO {
  target_role: 'customer';
  user_id: number | null;
  type: 'order' | 'payment' | 'system';
  message: string;
}

export interface BulkNotificationResponse {
  message: string;
  updatedCount?: number;
  deletedCount?: number;
}

export type CreateNotificationRequestDTO =
  | CreateAdminNotificationDTO
  | CreateUserNotificationDTO;

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getUserNotifications(): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/user`);
  }

  getAdminNotifications(): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/admin`);
  }

  getNotification(id: number | string): Observable<NotificationDTO> {
    return this.http.get<NotificationDTO>(`${this.baseUrl}/${id}`);
  }

  createNotification(data: CreateNotificationRequestDTO): Observable<NotificationDTO> {
    return this.http.post<NotificationDTO>(this.baseUrl, data);
  }

  markAsRead(id: number | string): Observable<NotificationDTO> {
    return this.http.patch<NotificationDTO>(`${this.baseUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<BulkNotificationResponse> {
    return this.http.patch<BulkNotificationResponse>(`${this.baseUrl}/read-all`, {});
  }

  deleteNotification(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteAllNotifications(): Observable<BulkNotificationResponse> {
    return this.http.delete<BulkNotificationResponse>(`${this.baseUrl}/all`);
  }
}
