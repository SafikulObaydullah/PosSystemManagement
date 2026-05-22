import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly apiBaseUrl = 'https://localhost:7065/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/Product`);
  }

  getInitialProductData(): Observable<unknown> {
    return this.http.get(`${this.apiBaseUrl}/Product/GetInitialProductData`);
  }

  saveProduct(product: Product): Observable<unknown> {
    return this.http.post(`${this.apiBaseUrl}/Product/SaveProduct`, product);
  }

  updateProduct(product: Product): Observable<unknown> {
    return this.http.put(`${this.apiBaseUrl}/Product/UpdateProduct`, product);
  }

  deleteProduct(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiBaseUrl}/Product/DeleteProduct?id=${id}`);
  }
}

