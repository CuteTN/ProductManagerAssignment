import { Action } from "@ngrx/store";
import { addToArray, findByIdAndRemoveFromArray } from "src/app/shared/utils/immutableFuncs";
import { Product } from 'src/app/shared/models';
import * as Actions from "../actions/products.actions"

const INITIAL_STATE: Product[] = []

export function productsReducer(state: Product[] = INITIAL_STATE, action: Action): Product[] {
  switch(action.type) {
    case Actions.ADD_A_PRODUCT: {
      const { payload } = action as Actions.AddAProductAction;
      return addToArray(state, payload);
    }

    case Actions.UPDATE_A_PRODUCT: {
      const { payload } = action as Actions.UpdateAProductAction;
      return addToArray(
        findByIdAndRemoveFromArray(state, payload.id),
        payload
      ) as Product[];
    }    

    case Actions.DELETE_A_PRODUCT: {
      const { payload } = action as Actions.DeleteAProductAction;
      return findByIdAndRemoveFromArray(state, payload.id) as Product[];
    }

    case Actions.SET_PRODUCTS: {
      const { payload } = action as Actions.SetProductsAction;
      return payload;
    }
  }

  return state;
}