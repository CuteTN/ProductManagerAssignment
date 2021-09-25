import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Supplier } from '../../../core/models'

export class SupplierValidators {
  static mustHasId(control: AbstractControl): ValidationErrors | null {
    if (!control?.value?.id) return { mustHasId: true };

    return null;
  }
}
