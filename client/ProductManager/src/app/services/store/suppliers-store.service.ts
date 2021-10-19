import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { StateStoreService } from './state-store.service';
import { Supplier } from 'src/app/shared/models';
import * as Actions from 'src/app/modules/ngrx/actions';
import { SupplierApiService } from '..';

@Injectable({
  providedIn: 'root'
})
export class SuppliersStoreService extends StateStoreService {
  constructor(
    apiService: SupplierApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.suppliers);
    this.apiService = apiService;
  }

  createSetAllAction = (suppliers: Supplier[]) => new Actions.SetSuppliersAction(suppliers);
}
