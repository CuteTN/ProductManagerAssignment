import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductsStoreService } from 'src/app/core/services';

@Component({
  selector: 'product-editor-page',
  templateUrl: './product-editor-page.component.html',
  styleUrls: ['./product-editor-page.component.css'],
})
export class ProductEditorPageComponent implements OnInit {
  // undefined if in add mode
  productToEdit?: Product;

  constructor(
    private router: Router,
    private productStore: ProductsStoreService
  ) {}

  ngOnInit(): void {
    this.productToEdit = history.state.product;
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleSubmitProduct(product: Product) {
    // if editting mode else add mode
    if (this.productToEdit?.id) {
      if (
        confirm(
          `Are you sure to update the product with ID = ${this.productToEdit.id}?`
        )
      )
        this.productStore.update(
          this.productToEdit.id,
          product,
          () => {
            alert('The product was updated successfully');
            this.router.navigate(['products']);
          },
          () => alert('Something went wrong!')
        );
    } else {
      if (confirm(`Are you sure to add this product?`))
        this.productStore.add(
          product,
          () => {
            alert('The product was added successfully');
            this.router.navigate(['products']);
          },
          () => alert('Something went wrong!')
        );
    }
  }
}
