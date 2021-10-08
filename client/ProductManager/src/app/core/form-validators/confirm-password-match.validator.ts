import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function confirmPasswordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const { password, confirmPassword } = control.value;
  if (password !== confirmPassword) return { confirmPasswordMismatched: true };

  return null;
}
