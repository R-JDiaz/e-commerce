import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductApiService } from '../../api/product/product-api.service';
import { ProductListItem } from '@common/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductManager {

  private isLoaded = false;

  private readonly productSubject = new BehaviorSubject<ProductListItem[]>([]);
  readonly product$ = this.productSubject.asObservable();

  constructor(
    private api: ProductApiService
  ) {}

  private load(): void {
    if (this.isLoaded) return;

    this.api.getProducts().pipe(
      tap(products => {
        this.productSubject.next(products);
        this.isLoaded = true;
      })
    ).subscribe();
  }

  getProducts(): Observable<ProductListItem[]> {
    this.load();
    
    return this.product$;
  }

  getProductById(id: string): Observable<ProductListItem | undefined> {
    return this.product$.pipe(
      map(products => products.find(p => p.id == id))
    );
  }

  searchProducts(query: string): Observable<ProductListItem[]> {
    const q = query.toLowerCase();

    return this.product$.pipe(
      map(products =>
        products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        ))
    );
  }

  filterByCategory(category: string): Observable<ProductListItem[]> {
    if (category === 'all') {
      return this.getProducts();
    }

    return this.product$.pipe(
      map(products =>
        products.filter(p => p.category_name === category)
      )
    );
  }

  getCategories(): string[] {
    return ['all', 'coffee', 'soda', 'food', 'dessert'];
  }

  getFeaturedProducts(): Observable<ProductListItem[]> {
    return this.getFeatured();
  }

  getFeatured(): Observable<ProductListItem[]> {
    this.load();

    return this.product$.pipe(
      map(products => this.pickRandom(products, 4))
    );
  }

  private pickRandom(products: ProductListItem[], count: number): ProductListItem[] {
    const pool = [...products];

    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, Math.min(count, pool.length));
  }
}
