import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalstorageTokensProviderService } from '.';
import { AuthenticationApiService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  constructor(
    private authenticationApiService: AuthenticationApiService,
    private tokenProvider: LocalstorageTokensProviderService,
  ) {}
  login = (username: string, password: string) => {
    return this.authenticationApiService
      .logIn(username, password)
      .pipe(this.updateLocalTokenProvider);
  };

  logout = () => {
    return this.authenticationApiService.invalidate(this.tokenProvider.refreshToken ?? "").pipe(
      map(response => {
        this.tokenProvider.accessToken = null;
        this.tokenProvider.refreshToken = null;
        
        return response;
      })
    )
  }

  refreshToken = () => {
    return this.authenticationApiService
      .refreshToken(this.tokenProvider.refreshToken ?? "")
      .pipe(this.updateLocalTokenProvider);
  };

  private updateLocalTokenProvider = map((response: LoginResponse) => {
    this.tokenProvider.accessToken = response.accessToken;
    this.tokenProvider.refreshToken = response.refreshToken;
    return response;
  });
}

export type LoginResponse = {
  userId?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
  expiration?: Date;
};
