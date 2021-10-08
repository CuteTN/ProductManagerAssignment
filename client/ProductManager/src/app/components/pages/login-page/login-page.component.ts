import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private authManager: AuthManagerService
  ) {
    this.form = formBuilder.group({
      username: [history.state.username, [Validators.required]],
      password: [undefined, [Validators.required]],
    });
  }

  handleToHomeClick() {
    this.router.navigate(['']);
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
          alert(`Logged in successfully with username ${username}`);
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
