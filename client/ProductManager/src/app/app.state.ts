import { Product } from "./core/models";

export interface AppState {
  readonly products: Product[],
}