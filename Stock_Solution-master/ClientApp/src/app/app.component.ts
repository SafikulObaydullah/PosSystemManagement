import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Product } from './models/product.model';
import { StockApiService } from './services/stock-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private stockApi: StockApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.stockApi.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load products. Please make sure Stock_API is running at https://localhost:7065.';
        this.isLoading = false;
      }
    });
  }
}
