import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductListItem } from '@common/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone: true,
})
export class ProductCardComponent {
  @Input() product!: ProductListItem;

  @Output() add = new EventEmitter<ProductListItem>();
}
