import { Category, Product, Supplier } from "src/app/shared/models";

export interface AppState {
  readonly products: Product[],
  readonly categories: Category[],
  readonly suppliers: Supplier[],
}