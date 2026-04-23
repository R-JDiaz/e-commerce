import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from './profile';
import { Auth } from '@common/services/managers/auth/auth';

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
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Profile);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
