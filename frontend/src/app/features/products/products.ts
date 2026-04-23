import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '@common/models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  @Input() products: Product[] = [];
  @Input() filteredProducts: Product[] = [];
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string = '';
  @Input() searchQuery: string = '';
  @Input() selectedCategory: string = 'all';

  @Output() search = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<Product>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }

  onCategoryChange(category: string) {
    this.categoryChange.emit(category);
  }

  getStarRating(rating: number, star: number): boolean {
    return star <= Math.floor(rating);
  }
}