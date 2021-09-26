import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Supplier } from '../../../core/models'

export class SupplierValidators {
  static mustHasIdOrNull(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    if (!control?.value?.id) return { mustHasIdOrNull: true };
    return null;
  }
}
