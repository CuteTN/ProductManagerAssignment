import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductsConnectorService } from 'src/app/core/services';

@Component({
  selector: 'product-editor-page',
  templateUrl: './product-editor-page.component.html',
  styleUrls: ['./product-editor-page.component.css'],
})
export class ProductEditorPageComponent implements OnInit {
  // undefined if in add mode
  productToEdit?: Product;

  constructor(private router: Router, private productConnector: ProductsConnectorService) {}
  
  ngOnInit(): void {
    this.productToEdit = history.state.product;
    console.log(this.productToEdit);
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleSubmitProduct(product: Product) {
    // if editting mode else add mode
    if(this.productToEdit?.id) {
      this.productConnector.update(this.productToEdit.id, product);
    } else {
      this.productConnector.add(product);
    }

    this.router.navigate(['products'])
  }

  handleRequestSuccess() {
  }
}
