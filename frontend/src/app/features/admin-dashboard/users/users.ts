import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type UserStatus = 'active' | 'suspended';

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: UserStatus;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class AdminUsersComponent {
  @Output() statusChange = new EventEmitter<{ id: string; status: UserStatus }>();

  users: AdminUserRow[] = [
    { id: '1', name: 'John Doe', email: 'user@example.com', role: 'user', status: 'active' },
    { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  ];
}
