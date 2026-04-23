import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserManager } from './user';
import { UserApiService } from '@common/services/api/user/user-api.service';

describe('UserManager', () => {
  let service: UserManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserApiService,
          useValue: {
            getUsers: () => of([]),
            getUser: () => of({
              id: 1,
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
            }),
            updateUser: () => of({
              id: 1,
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
            }),
            deleteUser: () => of(void 0),
          },
        },
      ],
    });

    service = TestBed.inject(UserManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
