import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  UpdateUserRequestDTO,
  UserCompleteDetailDTO,
  UserDetailDTO,
  UserSummaryDTO,
} from '@common/dtos/user.dto';

export type UserSummary = UserSummaryDTO;
export type UserDetail = UserDetailDTO;
export type UpdateUserRequest = UpdateUserRequestDTO;

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/user`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserCompleteDetailDTO[]> {
    return this.http.get<UserCompleteDetailDTO[]>(this.baseUrl);
  }

  getUser(id: number | string): Observable<UserDetailDTO> {
    return this.http.get<UserDetailDTO>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number | string, data: UpdateUserRequestDTO): Observable<UserDetailDTO> {
    return this.http.put<UserDetailDTO>(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
