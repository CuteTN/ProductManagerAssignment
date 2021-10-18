import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category, Product, Supplier } from 'src/app/core/models';
import {
  CategoriesStoreService,
  SuppliersStoreService,
} from 'src/app/core/services';
import { SupplierValidators } from '../../../core/form-validators/supplier.validator';

@Component({
  selector: 'product-editor-form',
  templateUrl: './product-editor-form.component.html',
  styleUrls: ['./product-editor-form.component.css'],
})
export class ProductEditorFormComponent implements OnInit {
  @Input('initial-product') initial?: Product | null;

  @Output('on-submit') private onSubmit = new EventEmitter<Product>()

  form: FormGroup;

  suppliers$: Observable<Supplier[]>;
  filteredSuppliers$?: Observable<Supplier[]>;

  categories$: Observable<Category[]>;
  filteredCategories$?: Observable<Category[]>;
  get selectedCategories(): Category[] {
    const result = this.form.get('categories')!.value as Category[];

    if(!result) {
      const newArr: Category[] = [];
      this.form.get('categories')!.setValue(newArr);

      return newArr;
    }

    return result;
  }
  set selectedCategories(categories: Category[]) {
    this.form.get('categories')?.setValue(categories);
  }

  constructor(
    formBuilder: FormBuilder,
    suppliersStore: SuppliersStoreService,
    categoriesStore: CategoriesStoreService
  ) {
    this.form = formBuilder.group({
      id: [undefined],
      name: [undefined, [Validators.required, Validators.maxLength(50)]],
      description: [undefined, [Validators.maxLength(500)]],
      releaseDate: [undefined, [Validators.required]],
      discontinuedDate: [undefined, [Validators.required]],
      rating: [undefined, [Validators.min(1), Validators.max(5)]],
      price: [undefined, [Validators.required, Validators.max(1e9)]],
      supplier: [undefined, [SupplierValidators.mustHasIdOrNull]],
      categorySearchedText: [undefined],
      categories: [[]],
      productDetail: formBuilder.group({
        details: [undefined, [Validators.maxLength(500)]],
      }),
    });

    this.categories$ = categoriesStore.getAll();
    this.suppliers$ = suppliersStore.getAll();
  }

  ngOnInit(): void {
    this.initFormValue();

    const supplierControl = this.form.get('supplier');
    if (supplierControl)
      this.filteredSuppliers$ = combineLatest([
        this.suppliers$,
        supplierControl.valueChanges.pipe(startWith('')),
      ]).pipe(
        map(([suppliers, searchedName]) =>
          this.filterByName(suppliers, searchedName)
        )
      );

    // const categoriesControl = this.form.get('categories');
    const categorySearchedTextControl = this.form.get('categorySearchedText');
    if (categorySearchedTextControl)
      this.filteredCategories$ = combineLatest([
        this.categories$,
        categorySearchedTextControl.valueChanges.pipe(startWith('')),
      ]).pipe(
        map(([categories, searchedName]) =>
          this.filterByName(categories, searchedName).filter((category) =>
            (this.selectedCategories as Category[]).every(
              (selectedCategory) => selectedCategory.id !== category.id
            )
          )
        )
      );
  }

  private filterByName<
    TItem extends { id: number | null; name: string | null }
  >(items: TItem[], searchedName: any) {
    return items.filter((item) => {
      if (!searchedName) return true;

      if (typeof searchedName === 'string')
        return item.name?.toLowerCase().includes(searchedName.toLowerCase());
      else if (typeof searchedName === 'object' && searchedName.id)
        return item.id === searchedName.id;

      return true;
    });
  }

  getName(obj: any) {
    return (obj?.name ?? '') as string;
  }

  handleSelectCategory({
    event,
    inputControl,
  }: {
    event: MatAutocompleteSelectedEvent;
    inputControl: HTMLInputElement;
  }) {
    const newCategory = event.option.value;

    if (newCategory?.id && newCategory?.name) {
      this.selectedCategories.push(newCategory);
      this.form.get('categorySearchedText')?.setValue(null);
      inputControl.value = '';
    }
  }

  handleRemoveCategory(category: Category) {
    this.selectedCategories = this.selectedCategories.filter(
      (c) => c.id !== category.id
    );
  }

  handleRatingChange(rating: Number | null) {
    this.form.patchValue({ rating });
  }

  getProduct(): Product {
    let product = { ...this.form.value };

    product.categoryIds = product.categories?.map(
      (category: Category) => category.id
    );

    product.supplierId = product.supplier?.id;

    delete product.categorySearchedText;

    return product;
  }

  initFormValue() {
    this.form.reset(this.initial);

    if(!this.initial?.categories)
      this.form.get("categories")?.setValue([]);
    if(!this.initial?.productDetail)
      this.form.get("productDetail")?.setValue({});

    this.form.markAsPristine();
  }

  handleResetFormClick() {
    this.initFormValue();
  }

  handleSubmitClick() {
    if (this.form.valid) {
      this.onSubmit.emit(this.getProduct());
    }
  }
}
