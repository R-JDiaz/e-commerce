import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategoryApiService } from '../../api/category/category-api.service';
import { CategoryManager } from './category';

describe('CategoryManager', () => {
  let service: CategoryManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryManager,
        {
          provide: CategoryApiService,
          useValue: {
            getCategories: () => of([]),
            createCategory: () => of({ id: 1, name: 'Coffee', slug: 'coffee' }),
            updateCategory: () => of({ id: 1, name: 'Coffee', slug: 'coffee' }),
            deleteCategory: () => of(void 0),
          },
        },
      ],
    });

    service = TestBed.inject(CategoryManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
