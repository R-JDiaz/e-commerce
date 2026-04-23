import { TestBed } from '@angular/core/testing';
import { AdminUsersComponent } from './users';

describe('AdminUsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminUsersComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
