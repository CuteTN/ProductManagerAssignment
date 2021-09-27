import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CategoryApiService, StateStoreService } from '..';
import { Category } from '../../models';
import * as Actions from '../../ngrx/actions';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService extends StateStoreService<Category> {
  constructor(
    apiService: CategoryApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.categories);
    this.apiService = apiService;
  }

  createSetAllAction = (categories: Category[]) => new Actions.SetCategoriesAction(categories);
}
