import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
  @Input('products') products: Product[] | null | undefined = [];

  @Output('on-edit-product') onEditProduct = new EventEmitter<Product>();
  @Output('on-remove-product') onRemoveProduct = new EventEmitter<Product>();

  public RENDERED_COLUMNS: string[] = [
    'id',
    'name',
    'description',
    'release-date',
    'discontinued-date',
    'rating',
    'price',
    'supplier',
    'categories',
    'details',
    'actions',
  ];

  getCategoriesOfProduct(product: Product) {
    return product.categories
      ?.map(c => c.name)
      ?.reduce((n1, n2) => `${n1}, ${n2}`, '')
      ?.slice(2);
  }

  handleEditProductClick(product: Product) {
    this.onEditProduct?.emit(product);
  }

  handleRemoveProductClick(product: Product) {
    this.onRemoveProduct?.emit(product);
  }
}
