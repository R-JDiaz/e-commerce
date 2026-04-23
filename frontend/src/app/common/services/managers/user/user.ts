import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserApiService,
  UpdateUserRequest,
  UserDetail,
  UserSummary,
} from '@common/services/api/user/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserManager {
  constructor(private api: UserApiService) {}

  getUsers(): Observable<UserSummary[]> {
    return this.api.getUsers();
  }

  getUser(id: number | string): Observable<UserDetail> {
    return this.api.getUser(id);
  }

  updateUser(id: number | string, data: UpdateUserRequest): Observable<UserDetail> {
    return this.api.updateUser(id, data);
  }

  deleteUser(id: number | string): Observable<void> {
    return this.api.deleteUser(id);
  }
}
