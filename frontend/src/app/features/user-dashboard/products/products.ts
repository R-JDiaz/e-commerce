import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListItem } from '@common/models/product';
import { ProductManager } from '@common/services/managers/product/product';
import { CategoryManager } from '@common/services/managers/category/category';
import { CategoryItem } from '@common/services/api/category/category-api.service';

import { ProductCardComponent } from '../../../common/components/product-card/product-card';
import { CartComponent } from '../cart/cart';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, CartComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  products: ProductListItem[] = [];
  filteredProducts: ProductListItem[] = [];
  categories: CategoryItem[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  isLoading = false;
  errorMessage = '';

  @Output() addToCart = new EventEmitter<ProductListItem>();

  constructor(
    private productManager: ProductManager,
    private categoryManager: CategoryManager
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryManager.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: () => this.errorMessage = 'Failed to load categories'
    });
  }

  loadProducts() {
    this.isLoading = true;

    this.productManager.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    this.productManager.searchProducts(this.searchQuery).subscribe({
      next: (res) => this.filteredProducts = res,
      error: () => this.errorMessage = 'Search failed'
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;

    this.productManager.filterByCategory(category).subscribe({
      next: (res) => this.filteredProducts = res,
      error: () => this.errorMessage = 'Filter failed'
    });
  }

  getCategoryLabel(slug: string): string {
    if (slug === 'all') {
      return 'All categories';
    }

    return this.categories.find(category => category.slug === slug)?.name ?? slug;
  }
}
