import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models';
import {
  ProductApiService,
  ProductFilterParams,
  ProductSortRule,
  ProductsStoreService
} from 'src/app/services';
import { MyDialogComponent, MyDialogData } from '../..';

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
    private router: Router,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.productsCount$ = apiService.getCount(
      this.filterParams
    ) as Observable<number>;
    this.products$ = this.fetchRequestedProducts() as Observable<Product[]>;
  }

  ngOnInit(): void {}

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

    const dialogData: MyDialogData = {
      title: 'Loading...',
      loading: true,
      disableClose: true,
    }

    const loadingWIPDialog = this.matDialog.open(MyDialogComponent, { data: dialogData })

    return (
      this.apiService.getSome(this.filterParams) as Observable<Product[]>
    ).pipe(
      map((res) => {
        loadingWIPDialog.close();
        this.state = 'Loaded';
        return res;
      }),
      catchError((err) => {
        loadingWIPDialog.close();
        this.state = 'Error'

        return throwError(err);
      })
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
    this.router.navigate(['product/edit/', product.id], { state: { product } });
  };

  private deleteProduct(product: Product) {
    if (!product?.id) return;

    const dialogData: MyDialogData = {
      title: 'Deleting...',
      loading: true,
      disableClose: true,
    }

    const deletingWIPDialog = this.matDialog.open(MyDialogComponent, { data: dialogData })

    const sub = this.productsStore.delete(product.id)?.subscribe(
      () => {
        deletingWIPDialog.close();
        this.toastr.success(
          `The product with ID = ${product.id} has been deleted successfully.`,
          `Product deleted!`
        );
        this.refreshData();

        sub?.unsubscribe();
      },
      () => {
        deletingWIPDialog.close();
        this.toastr.error(
          `Failed to delete the product with ID = ${product.id}.`,
          'Error!'
        );
      }
    );
  }

  handleRemoveProductClick = (product: Product) => {
    if (!product.id) return;

    const dialogData: MyDialogData = {
      title: 'Delete product?',
      text: `Are you sure to delete the product with ID = ${product.id}?`,
      disableClose: true,
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          color: 'primary',
          handle: () => {
            this.deleteProduct(product);
          },
        },
      ],
    };

    this.matDialog.open(MyDialogComponent, { data: dialogData });
  };
}
