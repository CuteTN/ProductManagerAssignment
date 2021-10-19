// source: https://stackoverflow.com/questions/57637923/angular-8-intercept-call-to-refresh-token

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {
  AuthManagerService,
  LocalstorageTokensProviderService,
} from '../../services';
import { filter, switchMap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CLIENT_NO_AUTH_PARAM_NAME } from '../utils/client-no-auth';

@Injectable()
export class RefreshTokenAndRetryInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenProvider: LocalstorageTokensProviderService,
    private authManager: AuthManagerService,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // my code, and it doesn't work.
    // return next.handle(httpRequest).pipe(
    //   catchError((error: any) => {
    //     if (error instanceof HttpErrorResponse && error.status === 401) {
    //       return this.authManager
    //         .refreshToken()
    //         .pipe(
    //           mergeMap(({ accessToken }) =>
    //             next.handle(
    //               httpRequest.clone({
    //                 setHeaders: { authorization: accessToken ?? '' },
    //               })
    //             )
    //           )
    //         );
    //     }

    //     return throwError(error);
    // })
    // );

    if (httpRequest.params.has(CLIENT_NO_AUTH_PARAM_NAME)) {
      return next.handle(httpRequest);
    }

    const accessExpired = this.jwtHelper.isTokenExpired(
      this.tokenProvider.accessToken ?? ''
    );
    const refreshExpired = this.jwtHelper.isTokenExpired(
      this.tokenProvider.refreshToken ?? ''
    );

    if (accessExpired && refreshExpired) {
      return next.handle(httpRequest);
    }

    if (accessExpired && !refreshExpired) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authManager.refreshToken().pipe(
          switchMap((authResponse) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(authResponse.refreshToken);
            return next.handle(this.injectToken(httpRequest));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((result) => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.injectToken(httpRequest));
          })
        );
      }
    }

    return next.handle(this.injectToken(httpRequest));
  }

  injectToken(request: HttpRequest<any>) {
    const token = this.tokenProvider.accessToken;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
