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

  category: Category[] | null,
  supplier: Supplier,
  productDetail: ProductDetail,
}