import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminProductsComponent } from './products';
import { ProductApiService } from '@common/services/api/product/product-api.service';
import { CategoryManager } from '@common/services/managers/category/category';

describe('AdminProductsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsComponent],
      providers: [
        {
          provide: ProductApiService,
          useValue: {
            getProduct: () => of({
              id: 1,
              name: 'Americano',
              description: 'Coffee',
              price: 4.5,
              stock: 10,
              category: { id: 1, name: 'Coffee', slug: 'coffee' },
              images: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }),
            updateProduct: () => of({}),
            deleteProduct: () => of(void 0),
          },
        },
        {
          provide: CategoryManager,
          useValue: {
            refreshCategories: () => of([{ id: 1, name: 'Coffee', slug: 'coffee' }]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminProductsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
