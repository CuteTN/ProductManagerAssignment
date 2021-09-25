import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { StateConnectorService } from '.';
import { ProductApiService } from '..';
import { Product } from '../../models';
import * as Actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsConnectorService extends StateConnectorService<Product> {
  constructor(
    apiService: ProductApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.products);
    this.apiService = apiService;
  }

  createSetAllAction = (products: Product[]) => new Actions.SetProductsAction(products);
  createAddAction = (product: Product) => new Actions.AddAProductAction(product);
  createUpdateAction = (product: Product) => new Actions.UpdateAProductAction(product);
  createDeleteAction = (id: number) => new Actions.DeleteAProductAction({id});
}
