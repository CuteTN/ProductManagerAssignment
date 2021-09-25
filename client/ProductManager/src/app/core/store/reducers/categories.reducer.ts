import { Action } from "@ngrx/store";
import { Category } from "../../models";
import * as Actions from "../actions/categories.actions"

const INITIAL_STATE: Category[] = []

export function categoriesReducer(state: Category[] = INITIAL_STATE, action: Action): Category[] {
  switch(action.type) {
    case Actions.SET_CATEGORIES: {
      const { payload } = action as Actions.SetCategoriesAction;
      return payload;
    }
  }

  return state;
}