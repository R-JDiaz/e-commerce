import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailDTO } from '@common/dtos/product.dto';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-display.html',
  styleUrl: './product-display.scss',
})
export class ProductDisplayComponent implements OnChanges, OnDestroy {
  @Input() product: ProductDetailDTO | null = null;
  @Input() isLoading = false;

  activeImageIndex = 0;
  quantity: number = 1;

  private slideshowTimer?: ReturnType<typeof setInterval>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.activeImageIndex = 0;
      this.syncSlideshow();
    }
  }

  ngOnDestroy(): void {
    this.clearSlideshow();
  }

  get images() {
    return this.product?.images ?? [];
  }

  get hasMultipleImages(): boolean {
    return this.images.length > 1;
  }

  get currentImageUrl(): string | null {
    if (!this.product) return null;

    const current = this.images[this.activeImageIndex];
    return current?.image_url ?? this.images[0]?.image_url ?? null;
  }

  nextImage(): void {
    if (!this.hasMultipleImages) return;

    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }

  previousImage(): void {
    if (!this.hasMultipleImages) return;

    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;

    this.activeImageIndex = index;
    this.syncSlideshow();
  }

  trackByImageId(_: number, image: { id: number }): number {
    return image.id;
  }

  private syncSlideshow(): void {
    this.clearSlideshow();

    if (!this.hasMultipleImages) return;

    this.slideshowTimer = setInterval(() => {
      this.nextImage();
    }, 4500);
  }

  private clearSlideshow(): void {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = undefined;
    }
  }

  addToCart(product: ProductDetailDTO, quantity: number): void {
    console.log(`Adding ${quantity} of ${product.name} to cart.`);
    // Add logic to handle adding to cart
  }
}
