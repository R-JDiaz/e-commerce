import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Profile } from './profile';
import { Auth } from '@common/services/managers/auth/auth';
import { UserManager } from '@common/services/managers/user/user';
import { ToastManager } from '@common/services/managers/toast/toast.manager';

describe('Profile', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile, RouterTestingModule],
      providers: [
        {
          provide: Auth,
          useValue: {
            getCurrentUser: () => ({ id: '1', email: 'test@example.com', type: 'user', name: 'Test User' }),
            updateCurrentUser: () => {},
            logout: () => {},
          },
        },
        {
          provide: UserManager,
          useValue: {
            getUser: () => of({
              id: '1',
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
              phone: null,
              address_line: null,
              city: null,
              state: null,
              postal_code: null,
            }),
            updateUser: () => of({
              id: '1',
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
              phone: null,
              address_line: null,
              city: null,
              state: null,
              postal_code: null,
            }),
            deleteUser: () => of(void 0),
            getUsers: () => of([]),
          },
        },
        {
          provide: ToastManager,
          useValue: {
            success: () => {},
            error: () => {},
            info: () => {},
            clear: () => {},
            toast$: of(null),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Profile);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
