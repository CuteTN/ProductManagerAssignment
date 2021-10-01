import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NULL_PRODUCT, Product } from 'src/app/core/models';
import { ProductSortRule } from 'src/app/core/services';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
  @Input('products') products: Product[] | null | undefined = [];
  @Input('min-rows') minRows: number = 0;

  @Output('on-edit-product') onEditProduct = new EventEmitter<Product>();
  @Output('on-remove-product') onRemoveProduct = new EventEmitter<Product>();
  @Output('on-sort-change') onSortChange = new EventEmitter<
    ProductSortRule[]
  >();

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

  /** The purpose of this function is just filling some NULL product to reach the min-row value, for the sake of rendering */
  fillWithNullProducts(products: Product[] | null | undefined) {
    const cloneProducts = [...(products ?? [])];

    while(cloneProducts.length < this.minRows)
      cloneProducts.push(NULL_PRODUCT);

    return cloneProducts;
  }

  getCategoriesOfProduct(product: Product) {
    return product.categories
      ?.map((c) => c.name)
      ?.reduce((n1, n2) => `${n1}, ${n2}`, '')
      ?.slice(2);
  }

  handleEditProductClick(product: Product) {
    this.onEditProduct?.emit(product);
  }

  handleRemoveProductClick(product: Product) {
    this.onRemoveProduct?.emit(product);
  }

  handleSortChange(sortEvent: Sort) {
    let field = sortEvent.active;
    if (field.toLowerCase() === 'supplier') field = 'supplierName';
    field = field.split('-').join('');

    this.onSortChange.emit(
      sortEvent.direction !== "" ?
        [{ field, direction: sortEvent.direction}] 
        : 
        []
    )
  }
}
