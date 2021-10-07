import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageTokensProviderService {
  set accessToken(token: string|null) {
    if(token != null)
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    else
      localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  set refreshToken(token: string|null) {
    if(token != null)
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    else
      localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
}
