import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagerService } from 'src/app/core/services';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authManager: AuthManagerService
  ) {
    this.form = formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });
  }

  handleToHomeClick() {
    this.router.navigate(['']);
  }

  handleSubmitClick = () => {
    if (!this.form.valid) return;
    const { username, password } = this.form.value;

    if (username && password) {
      const sub = this.authManager
        .login(username, password)
        .subscribe(() => sub.unsubscribe());
      this.router.navigate(['']);
    }
  };
}
