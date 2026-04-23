import { TestBed } from '@angular/core/testing';
import { AdminOrdersComponent } from './orders';

describe('AdminOrdersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrdersComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminOrdersComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
