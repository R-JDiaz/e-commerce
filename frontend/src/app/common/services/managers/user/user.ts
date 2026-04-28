import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  UserApiService,
  UpdateUserRequest,
  UserDetail,
  UserSummary,
} from '@common/services/api/user/user-api.service';
import { UpdateUserRequestDTO, UserCompleteDetailDTO } from '@common/dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserManager {
  private isLoaded = false;
  private readonly usersSubject = new BehaviorSubject<UserCompleteDetailDTO[]>([]);
  readonly users$ = this.usersSubject.asObservable();

  constructor(private api: UserApiService) {}

  refresh(): void {
    this.api.getUsers().subscribe({
      next: (users) => {
        this.usersSubject.next(users);
        this.isLoaded = true;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
  load(): void {
    if (this.isLoaded) return;

    this.refresh();
  }

  getUsers() : Observable<UserCompleteDetailDTO[]> {
    this.load();

    return this.usersSubject;
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
