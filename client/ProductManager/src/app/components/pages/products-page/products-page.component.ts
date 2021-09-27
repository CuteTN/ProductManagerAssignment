import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models';
import { ProductsStoreService } from 'src/app/core/services/store';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;
  get isProductsLoaded() {
    return this.productsStore.isLoaded;
  }

  constructor(
    private dialog: MatDialog,
    private productsStore: ProductsStoreService,
    private router: Router
  ) {
    this.products$ = productsStore.getAll();
  }

  ngOnInit(): void {}

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleAddProductClick = () => {
    this.router.navigate(['product/editor']);
  };

  handleEditProductClick = (product: Product) => {
    this.router.navigate(['product/editor'], { state: { product } });
  };

  handleRemoveProductClick = (product: Product) => {
    if (product.id)
      if (
        confirm(`Are you sure to delete the product with ID = ${product.id}?`)
      )
        this.productsStore.delete(
          product.id,
          () => alert('The product was removed successfully'),
          () => alert('Something went wrong!')
        );
  };
}
