import { TestBed } from '@angular/core/testing';
import { AdminAnalyticsComponent } from './analytics';

describe('AdminAnalyticsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnalyticsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminAnalyticsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
