import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { StateStoreService, SupplierApiService } from '..';
import { Supplier } from '../../models';
import * as Actions from '../../ngrx/actions';

@Injectable({
  providedIn: 'root'
})
export class SuppliersStoreService extends StateStoreService<Supplier> {
  constructor(
    apiService: SupplierApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.suppliers);
    this.apiService = apiService;
  }

  createSetAllAction = (suppliers: Supplier[]) => new Actions.SetSuppliersAction(suppliers);
}
