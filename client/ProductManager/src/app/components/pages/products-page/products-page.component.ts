import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/core/models';
import {
  ProductApiService,
  ProductFilterParams,
  ProductSortRule,
} from 'src/app/core/services';
import { ProductsStoreService } from 'src/app/core/services/store';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;

  state: 'Loaded' | 'Loading' | 'Error' = 'Loading';

  INITIAL_PAGE: number = 0;
  INITIAL_LIMIT: number = 5;
  productsCount$?: Observable<number>;
  filterParams: ProductFilterParams = {
    limit: this.INITIAL_LIMIT,
    page: this.INITIAL_PAGE,
  };

  constructor(
    private productsStore: ProductsStoreService,
    private apiService: ProductApiService,
    private router: Router
  ) {
    this.productsCount$ = apiService.getCount(
      this.filterParams
    ) as Observable<number>;
    this.products$ = this.fetchRequestedProducts() as Observable<Product[]>;
  }

  ngOnInit(): void {}

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleAddProductClick = () => {
    this.router.navigate(['product/editor']);
  };

  /** @deprecated We no longer follow the fetch-all-products-at-once approach. */
  private fetchAllProducts = () => {
    // return this.productsStore.getAll(undefined, () => (this.isError = true));
  };

  private patchFilterParams(toPatchParams?: ProductFilterParams) {
    if (!toPatchParams) return;
    this.filterParams = { ...this.filterParams, ...toPatchParams };
  }

  private fetchRequestedProducts = () => {
    this.state = 'Loading';
    return (
      this.apiService.getSome(this.filterParams) as Observable<Product[]>
    ).pipe(
      map((res) => {
        this.state = 'Loaded';
        return res;
      }),
      catchError(() => (this.state = 'Error'))
    ) as Observable<Product[]>;
  };

  handleSearchFilterSubmit(filterParams: ProductFilterParams) {
    this.patchFilterParams(filterParams);
    this.patchFilterParams({ page: 0 });
    this.productsCount$ = this.apiService.getCount(
      this.filterParams
    ) as Observable<number>;
    this.products$ = this.fetchRequestedProducts() as Observable<Product[]>;
  }

  handlePageChange(pageEvent: PageEvent) {
    this.patchFilterParams({
      page: pageEvent.pageIndex,
      limit: pageEvent.pageSize,
    });
    this.products$ = this.fetchRequestedProducts() as Observable<Product[]>;
  }

  handleSortChange(sortRules: ProductSortRule[]) {
    this.patchFilterParams({
      sortRules,
    });
    this.products$ = this.fetchRequestedProducts() as Observable<Product[]>;
  }

  refreshData = () => {
    this.productsCount$ = this.apiService.getCount(
      this.filterParams
    ) as Observable<number>;
    this.products$ = this.fetchRequestedProducts();
  };

  handleRefreshClick = () => {
    this.refreshData();
  };

  handleEditProductClick = (product: Product) => {
    this.router.navigate(['product/editor'], { state: { product } });
  };

  handleRemoveProductClick = (product: Product) => {
    if (product.id)
      if (
        confirm(`Are you sure to delete the product with ID = ${product.id}?`)
      ) {
        const sub = this.productsStore.delete(product.id)?.subscribe(
          () => {
            alert('The product was removed successfully');
            this.refreshData();

            sub?.unsubscribe();
          },
          () => alert('Something went wrong!')
        );
      }
  };
}
