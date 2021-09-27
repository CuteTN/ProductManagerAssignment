import { Action } from "@ngrx/store";
import { Product } from "../../models";

// constants //////////////////////////////////////////////////////////////////////////////////////////////////
const PRODUCT_PREFIX = `[PRODUCTS]`;

export const SET_PRODUCTS = `${PRODUCT_PREFIX} SET`;
export const ADD_A_PRODUCT = `${PRODUCT_PREFIX} ADD`;
export const UPDATE_A_PRODUCT = `${PRODUCT_PREFIX} EDIT`;
export const DELETE_A_PRODUCT = `${PRODUCT_PREFIX} REMOVE`;

// actions //////////////////////////////////////////////////////////////////////////////////////////////////
export class SetProductsAction implements Action {
  type = SET_PRODUCTS;
  constructor (public payload: Product[]) {};
}

export class AddAProductAction implements Action {
  type = ADD_A_PRODUCT;
  constructor (public payload: Product) {};
}

export class UpdateAProductAction implements Action {
  type = UPDATE_A_PRODUCT;
  constructor (public payload: Product) {};
}

export class DeleteAProductAction implements Action {
  type = DELETE_A_PRODUCT;
  constructor (public payload: { id: number | null }) {};
}