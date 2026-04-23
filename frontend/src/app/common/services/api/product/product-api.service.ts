import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CreateProductRequest, ProductDetail, ProductListItem } from '../../../models/product';

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  /**
   * List all products
   */
  getProducts(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(this.baseUrl);
  }

  /**
   * Get product details by ID
   */
  getProduct(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new product (admin only)
   */
  createProduct(product: CreateProductRequest): Observable<ProductDetail> {
    return this.http.post<ProductDetail>(this.baseUrl, product);
  }

  /**
   * Update an existing product (admin only)
   */
  updateProduct(id: number, product: UpdateProductRequest): Observable<ProductDetail> {
    return this.http.put<ProductDetail>(`${this.baseUrl}/${id}`, product);
  }

  /**
   * Delete a product (admin only)
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}