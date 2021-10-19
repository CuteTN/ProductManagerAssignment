import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageTokensProviderService } from '../services';

/**
 * @deprecated refresh-token-and-retry interceptor has already done the job. But I'm proud of this code so let's just keep it.
 */
@Injectable()
export class BearerTokenHeaderInterceptor implements HttpInterceptor {
  constructor(private tokenProvider: LocalstorageTokensProviderService) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(
      httpRequest.clone({
        setHeaders: {
          authorization: 'bearer ' + this.tokenProvider.accessToken,
        },
      })
    );
  }
}
