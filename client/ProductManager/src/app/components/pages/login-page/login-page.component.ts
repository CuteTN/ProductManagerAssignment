import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthManagerService } from 'src/app/core/services';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form: FormGroup;
  responseError?: { message: string } | null;
  passwordVisibility: boolean = false;
  isLoginInProgress: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authManager: AuthManagerService,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group({
      username: [history.state.username, [Validators.required]],
      password: [undefined, [Validators.required]],
    });
  }

  handleResetButtonClick() {
    this.responseError = null;
  }

  handleSubmitClick = () => {
    if (!this.form.valid) return;
    this.responseError = null;

    const { username, password } = this.form.value;

    if (username && password) {
      this.isLoginInProgress = true;

      const sub = this.authManager.login(username, password).subscribe(
        () => {
          this.isLoginInProgress = false;
          sub.unsubscribe();
          this.toastr.success(
            `Welcome back, ${username}!`,
            `Logged in`
          )
          this.router.navigate(['']);
        },
        (error) => {
          this.isLoginInProgress = false;
          const { message } = error?.error ?? {};
          if(message)
            this.responseError = { message };
        }
      );
    }
  };
}
