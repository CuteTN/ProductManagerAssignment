import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductApiService, ProductsStoreService } from 'src/app/core/services';
import { CLIENT_NO_AUTH_PARAMS } from 'src/app/core/utils/client-no-auth';

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
  fetchingState: "loaded" | "loading" | "error" | "none" = "none";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productStore: ProductsStoreService,
    private productApiService: ProductApiService
  ) {}

  ngOnInit(): void {
    // NOTE: the ID cannot change.
    const productIdStr = this.route.snapshot.paramMap.get('id');
    if(productIdStr)
    {
      this.productId = parseInt(productIdStr);

      this.productToEdit = history.state.product;

      if(!this.productToEdit) {
        this.fetchProductFromServer();
      }
    }
  }

  /**
   * WARNING: make sure that this function is only called successfully once
   */
  fetchProductFromServer = () => {
    if(!this.productId)
      return;

    this.fetchingState = "loading";
    const sub = this.productApiService.getById(this.productId, { params: CLIENT_NO_AUTH_PARAMS }).subscribe(
      (response) => {
        this.productToEdit = (response as unknown) as Product;
        this.fetchingState = "loaded";
        sub.unsubscribe();
      },
      (error) => {
        this.fetchingState = "error";
        sub.unsubscribe();
      } 
    );

  }

  handleRefreshClick = () => {
    this.fetchProductFromServer();
  }

  handleSubmitProduct(product: Product) {
    if(this.isUploadInProgress)
      return;

    // if editting mode else add mode
    if (this.productToEdit?.id) {
      this.handleEditProduct(product);
    } else {
      this.handleAddProduct(product);
    }
  }

  handleEditProduct = (product: Product) => {
    if (!this.productToEdit?.id) return;

    const confirmAction = confirm(
      `Are you sure to update the product with ID = ${this.productToEdit.id}?`
    );

    if (confirmAction) {
      this.isUploadInProgress = true;

      const sub = this.productStore
        .update(this.productToEdit.id, product)
        ?.subscribe(
          () => {
            this.isUploadInProgress = false;
            sub?.unsubscribe();
            alert('The product was updated successfully');
            this.router.navigate(['products']);
          },
          () => {
            this.isUploadInProgress = false;
            sub?.unsubscribe();
            alert('Something went wrong!');
          }
        );
    }
  };

  handleAddProduct = (product: Product) => {
    if (this.productToEdit?.id) return;

    const confirmAction = confirm(`Are you sure to add this product?`);

    if (confirmAction) {
      this.isUploadInProgress = true;

      const sub = this.productStore.add(product)?.subscribe(
        () => {
          this.isUploadInProgress = false;
          sub?.unsubscribe();
          alert('The product was added successfully');
          this.router.navigate(['products']);
        },
        () => {
          this.isUploadInProgress = false;
          sub?.unsubscribe();
          alert('Something went wrong!')
        }
      );
    }
  };
}
