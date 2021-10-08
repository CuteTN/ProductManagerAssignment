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
      this.handleEditProduct(product);
    } else {
      this.handleAddProduct(product);
    }
  }

  handleEditProduct = (product: Product) => {
    if (!this.productToEdit?.id) return;

    const confirmAction = confirm(
      `Are you sure to update the product with ID = ${this.productToEdit.id}?`
    );

    if (confirmAction) {
      const sub = this.productStore
        .update(this.productToEdit.id, product)
        ?.subscribe(
          () => {
            alert('The product was updated successfully');
            this.router.navigate(['products']);
            sub?.unsubscribe();
          },
          () => alert('Something went wrong!')
        );
    }
  };

  handleAddProduct = (product: Product) => {
    if (this.productToEdit?.id) return;

    const confirmAction = confirm(`Are you sure to add this product?`);

    if (confirmAction) {
      const sub = this.productStore.add(product)?.subscribe(
        () => {
          alert('The product was added successfully');
          this.router.navigate(['products']);

          sub?.unsubscribe();
        },
        () => alert('Something went wrong!')
      );
    }
  };
}
