import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminSettingsComponent } from './settings';
import { Auth } from '@common/services/managers/auth/auth';

describe('AdminSettingsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSettingsComponent, RouterTestingModule],
      providers: [
        {
          provide: Auth,
          useValue: {
            getCurrentUser: () => ({ id: '1', email: 'admin@example.com', type: 'admin', name: 'Admin User' }),
            updateCurrentUser: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminSettingsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
