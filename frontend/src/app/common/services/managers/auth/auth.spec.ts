import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Auth } from './auth';
import { AuthApiService } from '@common/services/api/auth/auth-api.service';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthApiService,
          useValue: {
            login: () => of({
              user: { id: 1, email: 'test@example.com', first_name: 'Test', last_name: 'User' },
              access_token: 'token',
              refresh_token: 'refresh',
            }),
            logout: () => of(void 0),
          },
        },
      ],
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
