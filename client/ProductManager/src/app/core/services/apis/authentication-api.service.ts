import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_SERVER_URL } from 'src/app/app.env';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService {
  private url = `${LOCAL_SERVER_URL}/api/authentication`;

  constructor(protected http: HttpClient) {}

  logIn = (userName: string, password: string) => {
    return this.http.post(`${this.url}/login`, { userName, password });
  };

  refreshToken = (refreshToken: string) => {
    return this.http.post(`${this.url}/refresh-token`, { refreshToken });
  };

  register = (userName: string, password: string) => {
    return this.http.post(`${this.url}/register`, { userName, password });
  };
}
