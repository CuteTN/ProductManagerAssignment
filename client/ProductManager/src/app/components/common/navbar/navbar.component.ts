import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthManagerService, LocalstorageTokensProviderService } from 'src/app/core/services';

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
  ) {}

  get username() {
    const token = this.tokenProvider.accessToken;
    return this.jwtHelper.decodeToken(token ?? undefined)?.username;
  }

  handleLogoutClick() {
    const sub = this.authManager.logout().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
