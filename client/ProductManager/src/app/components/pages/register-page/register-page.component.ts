import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordMatchValidator } from '../../../core/form-validators/confirm-password-match.validator';
import {
  AuthenticationApiService,
  AuthManagerService,
} from 'src/app/core/services';
import { ErrorStateMatcher } from '@angular/material/core';
import { passwordValidator } from 'src/app/core/form-validators/password.validator';
import { PasswordMeter } from 'password-meter';
import { ToastrService } from 'ngx-toastr';

class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(
      control &&
      control.invalid &&
      control.parent?.touched
    );
    const { confirmPasswordMismatched } = control?.parent?.errors ?? {};

    return control?.touched && (invalidCtrl || confirmPasswordMismatched);
  }
}

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  form: FormGroup;
  responseErrors?: RegisterResponseError[] | null;
  passwordVisibility: boolean = false;
  isRegisterInProgress: boolean = false;
  confirmPasswordErrorStateMatcher = new ConfirmPasswordErrorStateMatcher();

  private passwordMeter = new PasswordMeter();
  get passwordStrength() {
    const password = this.form.get('password')?.value;
    return this.passwordMeter.getResult(password);
  }

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authenticationApiService: AuthenticationApiService,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group(
      {
        username: [undefined, [Validators.required]],
        password: [undefined, [passwordValidator]],
        confirmPassword: [undefined, [Validators.required]],
        isPolicyAccepted: [false, [Validators.requiredTrue]],
      },
      { validators: confirmPasswordMatchValidator }
    );
  }

  handleResetButtonClick() {
    this.responseErrors = null;
  }

  handleSubmitClick = () => {
    if (!this.form.valid) return;
    this.responseErrors = null;

    const { username, password } = this.form.value;

    if (username && password) {
      this.isRegisterInProgress = true;

      const sub = this.authenticationApiService
        .register(username, password)
        .subscribe(
          () => {
            this.isRegisterInProgress = false;
            sub.unsubscribe();
            this.toastr.success(
              `Hi, ${username}, please log in to continue!`,
              `Registered!`
            )
            this.router.navigate(['login'], { state: { username }, replaceUrl: true });
          },
          (error) => {
            this.isRegisterInProgress = false;
            const { errors } = error.error ?? {};

            if (Array.isArray(errors)) {
              this.responseErrors = errors
                .filter((e) => e.code && e.description != null)
                .map((e: any): RegisterResponseError => ({ ...e }));
            }
          }
        );
    }
  };
}

type RegisterResponseError = {
  code: string;
  description: string;
};
