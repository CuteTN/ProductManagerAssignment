import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { DataQueryError } from 'src/app/core/errors';
import { Product } from 'src/app/core/models';
import { ProductApiService } from 'src/app/core/services';
import { SetProductsAction } from 'src/app/core/store/actions';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productApiService: ProductApiService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.products$ = store.select((state) => state.products);
  }

  ngOnInit(): void {
    const sub = this.productApiService.getAll().subscribe(
      (response) => {
        this.store.dispatch(new SetProductsAction(response as Product[]));
        sub.unsubscribe(); // unsubscibed as soon as the response is received
      },
      (error: DataQueryError) => {
        throw error;
      }
    );
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleAddProductClick() {
    this.router.navigate(['product/editor']);
  }

  handleEditProductClick(product: Product) {
    console.log("Edit product", product.id);
  }

  handleRemoveProductClick(product: Product) {
    console.log("Remove product", product.id);
  }
}
