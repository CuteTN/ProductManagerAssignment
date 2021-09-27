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

  constructor(private router: Router, private productStore: ProductsStoreService) {}
  
  ngOnInit(): void {
    this.productToEdit = history.state.product;
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleSubmitProduct(product: Product) {
    // if editting mode else add mode
    if(this.productToEdit?.id) {
      this.productStore.update(this.productToEdit.id, product);
    } else {
      this.productStore.add(product);
    }

    this.router.navigate(['products'])
  }

  handleRequestSuccess() {
  }
}
