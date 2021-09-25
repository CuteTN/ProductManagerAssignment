import { Category, Product, Supplier } from "./core/models";

export interface AppState {
  readonly products: Product[],
  readonly categories: Category[],
  readonly suppliers: Supplier[],
}