import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { StateConnectorService, SupplierApiService } from '..';
import { Supplier } from '../../models';
import * as Actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class SuppliersConnectorService extends StateConnectorService<Supplier> {
  constructor(
    apiService: SupplierApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.suppliers);
    this.apiService = apiService;
  }

  createSetAllAction = (suppliers: Supplier[]) => new Actions.SetSuppliersAction(suppliers);
}
