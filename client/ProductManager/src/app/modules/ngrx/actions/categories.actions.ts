import { Action } from "@ngrx/store";
import { Category } from 'src/app/shared/models';

// constants //////////////////////////////////////////////////////////////////////////////////////////////////
const CATEGORY_PREFIX = `[CATEGORY]`;

export const SET_CATEGORIES = `${CATEGORY_PREFIX} SET`;

// actions //////////////////////////////////////////////////////////////////////////////////////////////////
export class SetCategoriesAction implements Action {
  type = SET_CATEGORIES;
  constructor (public payload: Category[]) {};
}