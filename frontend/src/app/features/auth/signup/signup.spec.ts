import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Signup } from './signup';
import { Auth } from '@common/services/managers/auth/auth';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signup, RouterTestingModule],
      providers: [
        {
          provide: Auth,
          useValue: {
            getCurrentUser: () => null,
            register: () =>
              of({
                id: '1',
                email: 'test@example.com',
                type: 'user',
                name: 'Test User',
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
