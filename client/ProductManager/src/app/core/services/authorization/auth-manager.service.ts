import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { LocalstorageTokensProviderService } from '.';
import { AuthenticationApiService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  constructor(
    private authenticationApiService: AuthenticationApiService,
    private tokenProvider: LocalstorageTokensProviderService,
    private jwtHelper: JwtHelperService
  ) {}

  login = (username: string, password: string) => {
    return this.authenticationApiService
      .logIn(username, password)
      .pipe(this.updateLocalTokenProvider);
  };

  logout = () => {
    return this.authenticationApiService
      .invalidate(this.tokenProvider.refreshToken ?? '')
      .pipe(
        map((response) => {
          this.tokenProvider.accessToken = null;
          this.tokenProvider.refreshToken = null;

          return response;
        })
      );
  };

  refreshToken = () => {
    return this.authenticationApiService
      .refreshToken(this.tokenProvider.refreshToken ?? '')
      .pipe(
        this.updateLocalTokenProvider,
        catchError(error => this.handleRefreshTokenFailed())
      );
  };


  /**
   * Simply check if both access token and refresh token are stored.
   */
  loggedInUsername = () => {
    const { accessToken, refreshToken } = this.tokenProvider;
    if (!(accessToken && refreshToken)) return;

    if (this.jwtHelper.isTokenExpired(refreshToken)) return null;

    const refreshTokenUser = this.jwtHelper.decodeToken(refreshToken).username;
    const accessTokenUser = this.jwtHelper.decodeToken(accessToken).username;

    if (refreshTokenUser !== accessTokenUser) return null;
    else return refreshTokenUser;
  };

  private updateLocalTokenProvider = map((response: LoginResponse) => {
    this.tokenProvider.accessToken = response.accessToken;
    this.tokenProvider.refreshToken = response.refreshToken;
    return response;
  });

  private handleRefreshTokenFailed = () => {
    return this.logout().pipe(
      map((): LoginResponse => ({}))
    )
  }
}

export type LoginResponse = {
  userId?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
  expiration?: Date;
};
