import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProductDetail, ProductListItem } from '@common/models/product';
import {
  ProductApiService,
  UpdateProductRequest,
} from '@common/services/api/product/product-api.service';
import {
  CategoryItem,
} from '@common/services/api/category/category-api.service';
import { CategoryManager } from '@common/services/managers/category/category';
import { finalize, Observable, switchMap, tap } from 'rxjs';
import { ProductManager } from '@common/services/managers/product/product';
import { ProductDetailDTO } from '@common/dtos/product.dto';
import { ToastManager } from '@common/services/managers/toast/toast.manager';
import { AdminProductCreateComponent } from './create-product/create-product';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminProductCreateComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class AdminProductsComponent implements OnInit {
  products$!: Observable<ProductListItem[]>;
  @Input() isLoading = false;
  @Input() errorMessage = '';

  @Output() refreshRequested = new EventEmitter<void>();

  categories: CategoryItem[] = [];
  selectedSummary: ProductListItem | null = null;
  selectedProduct: ProductDetailDTO | null = null;
  isSaving = false;
  isDeleting = false;
  showCreateForm = false;

  readonly productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryManager: CategoryManager,
    private manager: ProductManager,
    private toastManager: ToastManager
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.products$ = this.manager.getProducts();
  }

  loadCategories(): void {
    this.categoryManager.refreshCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.toastManager.error('Categories Failed to Load');
      },
    });
  }

  openCreateForm(): void {
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
  }

  handleProductCreated(): void {
    this.showCreateForm = false;
    this.refreshRequested.emit();
  }

  selectProduct(product: ProductListItem): void {
    this.selectedSummary = product;
    
    const productId = Number(product.id);
    if (!Number.isFinite(productId)) {
      this.toastManager.error('This product cannot be edited because its ID is invalid.');
      console.log(product);
      return;
    }

    this.manager.selectProduct(productId).pipe(
      tap(product => {
        this.selectedProduct = product;

        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: product.category?.id ?? null
        });
        this.productForm.markAsPristine();
      })
    ).subscribe();
  }


  closeEditor(): void {
    this.selectedSummary = null;
    this.selectedProduct = null;
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: null,
    });
  }

saveProduct(): void {
  if (!this.selectedProduct) return;

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const value = this.productForm.value;

  const payload: UpdateProductRequest = {
    name: value.name ?? '',
    description: value.description ?? '',
    price: Number(value.price ?? 0),
    stock: Number(value.stock ?? 0),
    category_id: value.categoryId ?? null,
  };

  this.isSaving = true;

  this.manager.updateProduct(this.selectedProduct.id, payload).pipe(
    finalize(() => {
      this.isSaving = false;
    })
  ).subscribe({
    next: (updatedProduct) => {
      console.log('Product updated successfully:', updatedProduct);
      this.toastManager.success("Product updated successfully");
      this.selectedProduct = updatedProduct;
      this.selectProduct(this.mapDetailToList(updatedProduct)); // reuse updated data directly
      
    },
    error: () => {
      this.toastManager.error("Failed to update product");
    }
  });
}

  deleteProduct(): void {
    if (!this.selectedProduct) return;

    const confirmDelete = window.confirm(`Delete ${this.selectedProduct.name}?`);
    if (!confirmDelete) return;

    this.isDeleting = true;

    this.manager.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.refreshRequested.emit();
        this.closeEditor();
      },
      error: () => {
        this.isDeleting = false;
        this.toastManager.error('Failed to delete product');
      },
    });
  }

  get selectedCategoryLabel(): string {
    return this.selectedSummary?.category_name ?? 'Uncategorized';
  }

  get selectedImageUrl(): string | null {
    return this.selectedProduct?.images?.[0]?.image_url ?? this.selectedSummary?.image_url ?? null;
  }

  trackByProductId(_: number, product: ProductListItem): string {
    return product.id;
  }

  private mapDetailToList(item: ProductDetailDTO): ProductListItem {
  return {
    id: String(item.id),
    name: item.name,
    price: item.price,
    stock: item.stock,
    description: item.description,
    category_name: item.category?.name ?? '',
    image_url: item.images?.[0]?.image_url ?? ''
  };
  }
}
