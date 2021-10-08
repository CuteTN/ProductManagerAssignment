import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_SERVER_URL } from 'src/app/app.env';
import { CLIENT_NO_AUTH_PARAMS } from '../../utils/client-no-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService {
  private url = `${LOCAL_SERVER_URL}/api/authentication`;

  constructor(protected http: HttpClient) {}

  logIn = (username: string, password: string) => {
    return this.http.post(
      `${this.url}/login`,
      { username, password },
      { params: CLIENT_NO_AUTH_PARAMS }
    );
  };

  refreshToken = (refreshToken: string) => {
    return this.http.post(
      `${this.url}/refresh-token`,
      { refreshToken },
      { params: CLIENT_NO_AUTH_PARAMS }
    );
  };

  register = (username: string, password: string) => {
    return this.http.post(
      `${this.url}/register`,
      { username, password },
      { params: CLIENT_NO_AUTH_PARAMS }
    );
  };

  invalidate = (refreshToken: string) => {
    return this.http.delete(`${this.url}/invalidate`, {
      body: { refreshToken },
      params: CLIENT_NO_AUTH_PARAMS,
    });
  };
}
