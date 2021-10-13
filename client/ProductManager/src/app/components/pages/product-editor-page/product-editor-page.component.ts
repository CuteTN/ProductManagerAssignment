import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models';
import { ProductApiService, ProductsStoreService } from 'src/app/core/services';
import { CLIENT_NO_AUTH_PARAMS } from 'src/app/core/utils/client-no-auth';
import { MyDialogComponent, MyDialogData } from '../..';

@Component({
  selector: 'product-editor-page',
  templateUrl: './product-editor-page.component.html',
  styleUrls: ['./product-editor-page.component.css'],
})
export class ProductEditorPageComponent implements OnInit {
  // undefined if in add mode
  productId?: number | null;
  productToEdit?: Product;
  isLoadingFromServer = false;
  isUploadInProgress = false;
  fetchingState: 'loaded' | 'loading' | 'error' | 'none' = 'none';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productStore: ProductsStoreService,
    private productApiService: ProductApiService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // NOTE: the ID cannot change.
    const productIdStr = this.route.snapshot.paramMap.get('id');
    if (productIdStr) {
      this.productId = parseInt(productIdStr);

      this.productToEdit = history.state.product;

      if (!this.productToEdit) {
        this.fetchProductFromServer();
      }
    }
  }

  /**
   * WARNING: make sure that this function is only called successfully once
   */
  fetchProductFromServer = () => {
    if (!this.productId) return;

    this.fetchingState = 'loading';
    const sub = this.productApiService
      .getById(this.productId, { params: CLIENT_NO_AUTH_PARAMS })
      .subscribe(
        (response) => {
          this.productToEdit = response as unknown as Product;
          this.fetchingState = 'loaded';
          sub.unsubscribe();
        },
        (error) => {
          this.fetchingState = 'error';
          sub.unsubscribe();
        }
      );
  };

  handleRefreshClick = () => {
    this.fetchProductFromServer();
  };

  handleSubmitProduct(product: Product) {
    if (this.isUploadInProgress) return;

    // if editting mode else add mode
    if (this.productToEdit?.id) {
      this.handleConfirmAndEditProduct(product);
    } else {
      this.handleConfirmAndAddProduct(product);
    }
  }

  handleConfirmAndEditProduct = (product: Product) => {
    if (!this.productToEdit?.id) return;

    const dialogData: MyDialogData = {
      title: 'Update product?',
      text: `Are you sure to update the product with ID = ${this.productToEdit.id}?`,
      disableClose: true,
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          color: 'primary',
          handle: () => {
            this.editProduct(product);
          },
        },
      ],
    };

    this.matDialog.open(MyDialogComponent, { data: dialogData });
  };

  handleConfirmAndAddProduct = (product: Product) => {
    if (this.productToEdit?.id) return;

    const dialogData: MyDialogData = {
      title: 'Add product?',
      text: `Are you sure to add this product?`,
      disableClose: true,
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          color: 'primary',
          handle: () => {
            this.addProduct(product);
          },
        },
      ],
    };

    this.matDialog.open(MyDialogComponent, { data: dialogData });
  };

  editProduct(product: Product) {
    if (!this.productToEdit?.id) return;

    this.isUploadInProgress = true;

    const sub = this.productStore
      .update(this.productToEdit.id, product)
      ?.subscribe(
        (res) => {
          this.isUploadInProgress = false;
          sub?.unsubscribe();
          this.router.navigate(['products']);
          this.toastr.success(
            `The product with ID = ${this.productToEdit?.id} has been updated successfully.`,
            'Product updated!'
          );
        },
        () => {
          this.isUploadInProgress = false;
          sub?.unsubscribe();
          this.toastr.error(
            `Failed to update the product with ID = ${this.productToEdit?.id}.`,
            'Error!'
          );
        }
      );
  }

  addProduct(product: Product) {
    this.isUploadInProgress = true;

    const sub = this.productStore.add(product)?.subscribe(
      (res) => {
        this.isUploadInProgress = false;
        sub?.unsubscribe();
        this.router.navigate(['products']);
        this.toastr.success(
          `A new product with ID = ${
            (res as any).id
          } has been added successfully.`,
          'Product added!'
        );
      },
      () => {
        this.isUploadInProgress = false;
        sub?.unsubscribe();
        this.toastr.error(`Failed to add the new product.`, 'Error!');
      }
    );
  }
}
