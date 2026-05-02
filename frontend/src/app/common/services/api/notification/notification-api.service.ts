import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

/* DTOs (you can move these to your @common/dtos later) */
export interface NotificationDTO {
  id: number;
  type: 'order' | 'payment' | 'system';
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface CreateNotificationRequestDTO {
  type: 'order' | 'payment' | 'system';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {

  private readonly baseUrl = `${environment.apiBaseUrl}/notifications`;

  constructor(private http: HttpClient) {}

  /** 🔔 Get all notifications of a user */
  getUserNotifications(): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/user`);
  }

  /** 🔍 Get single notification */
  getNotification(id: number | string): Observable<NotificationDTO> {
    return this.http.get<NotificationDTO>(`${this.baseUrl}/${id}`);
  }

  /** ➕ Create */
  createNotification(data: CreateNotificationRequestDTO): Observable<NotificationDTO> {
    return this.http.post<NotificationDTO>(this.baseUrl, data);
  }

  /** ✅ Mark as read */
  markAsRead(id: number | string): Observable<NotificationDTO> {
    return this.http.patch<NotificationDTO>(`${this.baseUrl}/${id}/read`, {});
  }

  /** ❌ Delete */
  deleteNotification(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}