import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category, Product, Supplier } from 'src/app/core/models';
import {
  CategoriesConnectorService,
  SuppliersConnectorService,
} from 'src/app/core/services';
import { SupplierValidators } from './supplier.validator';

@Component({
  selector: 'product-editor-form',
  templateUrl: './product-editor-form.component.html',
  styleUrls: ['./product-editor-form.component.css'],
})
export class ProductEditorFormComponent implements OnInit{
  form: FormGroup;
  categories$: Observable<Category[]>;

  suppliers$: Observable<Supplier[]>;
  filteredSuppliers$?: Observable<Supplier[]>;

  @Input('initial-data') private _initial?: Product | null | undefined;

  constructor(
    formBuilder: FormBuilder,
    suppliersConnector: SuppliersConnectorService,
    categoriesConnector: CategoriesConnectorService
  ) {
    this.form = formBuilder.group({
      id: [undefined],
      name: [undefined, [Validators.required, Validators.maxLength(50)]],
      description: [undefined, [Validators.maxLength(500)]],
      releaseDate: [undefined, [Validators.required]],
      discontinuedDate: [undefined, [Validators.required]],
      rating: [undefined, [Validators.min(1), Validators.max(5)]],
      price: [undefined, [Validators.required, Validators.max(1e9)]],
      supplier: [undefined, [SupplierValidators.mustHasId]],
      categories: formBuilder.array([]),
      productDetail: formBuilder.group({
        detail: [undefined, [Validators.maxLength(500)]],
      }),
    });

    this.categories$ = categoriesConnector.getAll();
    this.suppliers$ = suppliersConnector.getAll();
  }

  ngOnInit(): void {
    const supplierControl = this.form.get('supplier');
    if (supplierControl)
      this.filteredSuppliers$ = combineLatest([
        this.suppliers$,
        supplierControl.valueChanges.pipe(startWith('')),
      ]).pipe(
        map(([suppliers, searchedName]) =>
          this.filterSuppliers(suppliers, searchedName)
        )
      );
  }

  private filterSuppliers(suppliers: Supplier[], searchedName: any) {
    return suppliers.filter((supplier) => {
      if (typeof searchedName === 'string')
        return supplier.name
          ?.toLowerCase()
          .includes(searchedName.toLowerCase());
      else if (typeof searchedName === 'object' && searchedName.id)
        return supplier.id === searchedName.id;

      return true;
    })
  }

  getName(obj: any) {
    return (obj?.name ?? '') as string;
  }

  handleRatingChange(rating: Number | null) {
    this.form.patchValue({ rating });
  }

  getProduct(): Product {
    let product: Product = { ...this.form.value };
    return product;
  }
}
