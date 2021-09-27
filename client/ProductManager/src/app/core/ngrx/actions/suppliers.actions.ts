import { Action } from "@ngrx/store";
import { Supplier } from '../../models';

// constants //////////////////////////////////////////////////////////////////////////////////////////////////
const SUPPLIER_PREFIX = `[SUPPLIER_PREFIX]`;

export const SET_SUPPLIERS = `${SUPPLIER_PREFIX} SET`;

// actions //////////////////////////////////////////////////////////////////////////////////////////////////
export class SetSuppliersAction implements Action {
  type = SET_SUPPLIERS;
  constructor (public payload: Supplier[]) {};
}