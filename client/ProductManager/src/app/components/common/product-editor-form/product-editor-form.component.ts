import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'product-editor-form',
  templateUrl: './product-editor-form.component.html',
  styleUrls: ['./product-editor-form.component.css'],
})
export class ProductEditorFormComponent {
  form: FormGroup;
  @Input('initial-data') private _initial?: Product | null | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: [undefined],
      name: [undefined, [Validators.required, Validators.maxLength(50)]],
      description: [undefined, [Validators.maxLength(500)]],
      releaseDate: [undefined, [Validators.required]],
      discontinuedDate: [undefined, [Validators.required]],
      rating: [undefined, [Validators.min(1), Validators.max(5)]],
      price: [undefined, [Validators.required, Validators.max(1e9)]],
      supplier: [undefined],
      categories: formBuilder.array([]),
      productDetail: formBuilder.group({
        detail: [undefined, [Validators.maxLength(500)]],
      }),
    });
  }

  getProduct(): Product {
    let product: Product = {...this.form.value}
    return product;
  }
}
