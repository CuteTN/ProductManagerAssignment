import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state';
import { DataQueryError } from './core/errors';
import { ProductApiService } from './core/services';
import { Product } from './core/models';
import { SetProductsAction } from './core/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ProductManager';
  // products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(
    private productApiService: ProductApiService,
    private store: Store<AppState>
  ) {
    this.products$ = store.select((state) => state.products);
    this.products$.subscribe((products) => {
      console.log('easy!', products);
    })

    productApiService.getAll().subscribe(
      (response) => {
        store.dispatch(new SetProductsAction(response as Product[]));
      },
      (error: DataQueryError) => {
        // if (error.type === )
        //   console.error('not found error', error);
        // else if (error instanceof BadRequestError)
        //   console.error('bad request error', error);
        // else throw error;
      }
    );
  }
}
