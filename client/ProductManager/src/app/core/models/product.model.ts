import { Category, ProductDetail, Supplier } from '.';

export interface Product {
  id: number | null,
  name: string | null,
  description: string | null,
  releaseDate: Date | null,
  discontinuedDate: Date | null,
  rating: number | null,
  price: number | null,
  supplierId: number | null,

  categories: Category[] | null,
  supplier: Supplier | null,
  productDetail: ProductDetail | null,
}

export const NULL_PRODUCT: Product = Object.freeze({
  id: null,
  name: null,
  description: null,
  releaseDate: null,
  discontinuedDate: null,
  rating: null,
  price: null,
  supplierId: null,
  categories: null,
  supplier: null,
  productDetail: null,
})