import { Action } from "@ngrx/store";
import { Supplier } from 'src/app/shared/models';
import * as Actions from "../actions/suppliers.actions"

const INITIAL_STATE: Supplier[] = []

export function suppliersReducer(state: Supplier[] = INITIAL_STATE, action: Action): Supplier[] {
  switch(action.type) {
    case Actions.SET_SUPPLIERS: {
      const { payload } = action as Actions.SetSuppliersAction;
      return payload;
    }
  }

  return state;
}