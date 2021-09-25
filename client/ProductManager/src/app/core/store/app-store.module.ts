// this file has nothing to do with Apple :)

import { StoreModule } from "@ngrx/store";
import * as Reducers from "./reducers";

export const AppStoreModule = StoreModule.forRoot({
  products: Reducers.productsReducer,
  categories: Reducers.categoriesReducer,
  suppliers: Reducers.suppliersReducer,
});