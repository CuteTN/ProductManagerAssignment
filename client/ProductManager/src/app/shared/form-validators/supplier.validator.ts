import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SupplierValidators {
  static mustHasIdOrNull(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    if (!control?.value?.id) return { mustHasIdOrNull: true };
    return null;
  }
}
