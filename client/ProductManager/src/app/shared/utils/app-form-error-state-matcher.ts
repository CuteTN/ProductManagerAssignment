// NOTE: This is to derive cross-field form validation error to a specific form control
// WARN: This will make the control involve to an error state if ANY errors occur in the parent control
// source: https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6

import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class AppFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}