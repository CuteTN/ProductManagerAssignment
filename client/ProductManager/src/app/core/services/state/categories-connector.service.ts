import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CategoryApiService, StateConnectorService } from '..';
import { Category } from '../../models';
import * as Actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class CategoriesConnectorService extends StateConnectorService<Category> {
  constructor(
    apiService: CategoryApiService,
    store: Store<AppState>
  ) {
    super(store, state => state.categories);
    this.apiService = apiService;
  }

  createSetAllAction = (categories: Category[]) => new Actions.SetCategoriesAction(categories);
}
