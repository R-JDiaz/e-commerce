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

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class AdminProductsComponent implements OnInit {
  @Input() products: ProductListItem[] = [];
  @Input() isLoading = false;
  @Input() errorMessage = '';

  @Output() refreshRequested = new EventEmitter<void>();

  categories: CategoryItem[] = [];
  selectedSummary: ProductListItem | null = null;
  selectedProduct: ProductDetail | null = null;
  editorError = '';
  editorNote = '';
  isSaving = false;
  isDeleting = false;

  readonly productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productApi: ProductApiService,
    private categoryManager: CategoryManager
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
  }

  loadCategories(): void {
    this.categoryManager.refreshCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.editorError = 'Failed to load categories';
      },
    });
  }

  selectProduct(product: ProductListItem): void {
    this.selectedSummary = product;
    this.editorError = '';
    this.editorNote = '';

    const productId = Number(product.id);
    if (!Number.isFinite(productId)) {
      this.editorError = 'This product cannot be edited because its ID is invalid.';
      return;
    }

    this.productApi.getProduct(productId).subscribe({
      next: (detail) => {
        this.selectedProduct = detail;
        this.productForm.patchValue({
          name: detail.name,
          description: detail.description,
          price: detail.price,
          stock: detail.stock,
          categoryId: detail.category?.id ?? null,
        });
        this.productForm.markAsPristine();
      },
      error: () => {
        this.editorError = 'Failed to load product details';
      },
    });
  }

  closeEditor(): void {
    this.selectedSummary = null;
    this.selectedProduct = null;
    this.editorError = '';
    this.editorNote = '';
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
      category_id: Number(value.categoryId ?? 0),
    };

    this.isSaving = true;
    this.editorError = '';

    this.productApi.updateProduct(this.selectedProduct.id, payload).subscribe({
      next: (updated) => {
        this.isSaving = false;
        this.selectedProduct = updated;
        this.productForm.patchValue({
          name: updated.name,
          description: updated.description,
          price: updated.price,
          stock: updated.stock,
          categoryId: updated.category?.id ?? null,
        });
        this.editorNote = 'Product saved successfully.';
        this.refreshRequested.emit();
      },
      error: () => {
        this.isSaving = false;
        this.editorError = 'Failed to save product';
      },
    });
  }

  deleteProduct(): void {
    if (!this.selectedProduct) return;

    const confirmDelete = window.confirm(`Delete ${this.selectedProduct.name}?`);
    if (!confirmDelete) return;

    this.isDeleting = true;
    this.editorError = '';

    this.productApi.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.refreshRequested.emit();
        this.closeEditor();
      },
      error: () => {
        this.isDeleting = false;
        this.editorError = 'Failed to delete product';
      },
    });
  }

  get selectedCategoryLabel(): string {
    return this.selectedProduct?.category?.name ?? this.selectedSummary?.category_name ?? 'Uncategorized';
  }

  get selectedImageUrl(): string | null {
    return this.selectedProduct?.images?.[0]?.image_url ?? this.selectedSummary?.image_url ?? null;
  }

  trackByProductId(_: number, product: ProductListItem): string {
    return product.id;
  }
}
