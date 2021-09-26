import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models';
import { ProductsConnectorService } from 'src/app/core/services/state';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;
  get isProductsLoaded() {
    return this.productsConnector.isLoaded
  }

  constructor(
    private productsConnector: ProductsConnectorService,
    private router: Router
  ) {
    this.products$ = productsConnector.getAll();
  }

  ngOnInit(): void { 
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleAddProductClick() {
    this.router.navigate(['product/editor']);
  }

  handleEditProductClick(product: Product) {
    console.log('Edit product', product.id);
  }

  handleRemoveProductClick(product: Product) {
    if(product.id)
      this.productsConnector.delete(product.id);
  }
}
