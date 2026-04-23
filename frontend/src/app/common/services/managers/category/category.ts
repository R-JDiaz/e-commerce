import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  CategoryApiService,
  CategoryItem,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@common/services/api/category/category-api.service';

@Injectable({
  providedIn: 'root',
})

export class CategoryManager {
  private isLoaded = false;

  private readonly categorySubject = new BehaviorSubject<CategoryItem[]>([]);
  readonly category$ = this.categorySubject.asObservable();

  constructor(
    private api: CategoryApiService
  ) {}

  private load(): void {
    if (this.isLoaded) return;

    this.api.getCategories().pipe(
      tap(categories => {
        this.categorySubject.next(categories);
        this.isLoaded = true;
      })
    ).subscribe();
  }

  refreshCategories(): Observable<CategoryItem[]> {
    return this.api.getCategories().pipe(
      tap(categories => {
        this.categorySubject.next(categories);
        this.isLoaded = true;
      })
    );
  }

  getCategories(): Observable<CategoryItem[]> {
    this.load();

    return this.category$;
  }

  getCategoryById(id: number): Observable<CategoryItem | undefined> {
    this.load();

    return this.category$.pipe(
      map(categories => categories.find(category => category.id === id))
    );
  }

  createCategory(category: CreateCategoryRequest): Observable<CategoryItem> {
    return this.api.createCategory(category).pipe(
      tap(createdCategory => {
        this.categorySubject.next([
          ...this.categorySubject.value,
          createdCategory,
        ]);
        this.isLoaded = true;
      })
    );
  }

  updateCategory(id: number, category: UpdateCategoryRequest): Observable<CategoryItem> {
    return this.api.updateCategory(id, category).pipe(
      tap(updatedCategory => {
        this.categorySubject.next(
          this.categorySubject.value.map(existingCategory =>
            existingCategory.id === id ? updatedCategory : existingCategory
          )
        );
      })
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.api.deleteCategory(id).pipe(
      tap(() => {
        this.categorySubject.next(
          this.categorySubject.value.filter(category => category.id !== id)
        );
      })
    );
  }
}