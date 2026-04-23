import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminDashboard } from './admin-dashboard';
import { ProductManager } from '@common/services/managers/product/product';
import { OrderService } from '@common/services/managers/order/order';
import { Auth } from '@common/services/managers/auth/auth';
import { ProductApiService } from '@common/services/api/product/product-api.service';
import { CategoryManager } from '@common/services/managers/category/category';

describe('AdminDashboard', () => {
  let component: AdminDashboard;
  let fixture: ComponentFixture<AdminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboard, RouterTestingModule],
      providers: [
        {
          provide: ProductManager,
          useValue: {
            getProducts: () => of([]),
          },
        },
        {
          provide: OrderService,
          useValue: {
            getAllOrders: () => of([]),
            updateOrderStatus: () => of({}),
          },
        },
        {
          provide: Auth,
          useValue: {
            logout: () => {},
          },
        },
        {
          provide: ProductApiService,
          useValue: {
            getProduct: () => of({}),
            updateProduct: () => of({}),
            deleteProduct: () => of(void 0),
          },
        },
        {
          provide: CategoryManager,
          useValue: {
            refreshCategories: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
