import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import {
  AuthManagerService,
  LocalstorageTokensProviderService,
} from 'src/app/core/services';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private tokenProvider: LocalstorageTokensProviderService,
    private authManager: AuthManagerService,
    private toastr: ToastrService
  ) {}

  get username() {
    const token = this.tokenProvider.accessToken;
    return this.jwtHelper.decodeToken(token ?? undefined)?.username;
  }

  handleLogoutClick() {
    const sub = this.authManager.logout().subscribe(
      () => {
        this.toastr.success(
          "Goodbye, we'll miss you, and Hạnh, and Yến, and Chương.",
          'Logged out'
        );
        sub.unsubscribe();
      },
      () => {
        this.toastr.error('Something went wrong!', 'Error!');
      }
    );
  }
}
