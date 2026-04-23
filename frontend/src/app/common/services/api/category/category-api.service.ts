import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  CategoryItemDTO,
  CreateCategoryRequestDTO,
  UpdateCategoryRequestDTO,
} from '@common/dtos/category.dto';

export type CategoryItem = CategoryItemDTO;
export type CreateCategoryRequest = CreateCategoryRequestDTO;
export type UpdateCategoryRequest = UpdateCategoryRequestDTO;

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  /**
   * List all categories
   */
  getCategories(): Observable<CategoryItemDTO[]> {
    return this.http.get<CategoryItemDTO[]>(this.baseUrl);
  }

  /**
   * Create a new category (admin only)
   */
  createCategory(category: CreateCategoryRequestDTO): Observable<CategoryItemDTO> {
    return this.http.post<CategoryItemDTO>(this.baseUrl, category);
  }

  /**
   * Update an existing category (admin only)
   */
  updateCategory(id: number, category: UpdateCategoryRequestDTO): Observable<CategoryItemDTO> {
    return this.http.put<CategoryItemDTO>(`${this.baseUrl}/${id}`, category);
  }

  /**
   * Delete a category (admin only)
   */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
