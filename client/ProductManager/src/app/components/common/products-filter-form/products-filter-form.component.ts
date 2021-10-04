import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductFilterParams } from 'src/app/core/services';

@Component({
  selector: 'products-filter-form',
  templateUrl: './products-filter-form.component.html',
  styleUrls: ['./products-filter-form.component.css'],
})
export class ProductsFilterFormComponent {
  form: FormGroup;
  @Output('on-apply') onApply = new EventEmitter<ProductFilterParams>();

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      hasName: [undefined],
      minId: [undefined],
      maxId: [undefined],
      minReleaseDate: [undefined],
      maxReleaseDate: [undefined],
      minRating: [undefined],
      maxRating: [undefined],
      minPrice: [undefined],
      maxPrice: [undefined],

      // TODO: Too lazy to work on dis at the moment :)
      // supplier: [undefined],
      // categories: [undefined],
    });
  }

  resetValueOfControl(controlName: string) {
    this.form?.get(controlName)?.setValue(null);
  }

  applyCurrentForm() {
    const filterParams = this.form.value;
    this.onApply.emit(filterParams);
  }

  handleSubmitClick() {
    this.applyCurrentForm();
  }

  handleResetClick() {
    this.form.reset();
    this.applyCurrentForm();
  }
}
