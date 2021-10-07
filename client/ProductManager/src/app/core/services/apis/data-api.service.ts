import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataQueryError, DataQueryErrorTypes } from '../../errors';
import { LocalstorageTokensProviderService } from '../';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  constructor(
    @Inject(String) protected url: string,
    protected http: HttpClient,
    protected tokenProvider: LocalstorageTokensProviderService
  ) {}

  createHeader = () => {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'bearer ' + this.tokenProvider.accessToken);
    return headers;
  };

  getAll = () =>
    this.http
      .get(this.url, { headers: this.createHeader() })
      .pipe(catchError(this.handleError));

  getById = (id: number) =>
    this.http
      .get(`${this.url}/${id}`, { headers: this.createHeader() })
      .pipe(catchError(this.handleError));

  create = (data: any) =>
    this.http
      .post(this.url, data, { headers: this.createHeader() })
      .pipe(catchError(this.handleError));

  update = (id: number, newData: any) =>
    this.http
      .put(`${this.url}/${id}`, newData, { headers: this.createHeader() })
      .pipe(catchError(this.handleError));

  delete = (id: number) =>
    this.http
      .delete(`${this.url}/${id}`, { headers: this.createHeader() })
      .pipe(catchError(this.handleError));

  private handleError = (error: Response) => {
    const appErrorType = ERROR_MAPPER[error.status];
    return throwError(new DataQueryError(error, appErrorType));
  };
}

const ERROR_MAPPER: { [status: number]: DataQueryErrorTypes | undefined } =
  Object.freeze({
    [HttpStatusCode.NotFound]: DataQueryErrorTypes.NotFound,
    [HttpStatusCode.BadRequest]: DataQueryErrorTypes.BadRequest,
    [HttpStatusCode.Unauthorized]: DataQueryErrorTypes.UnauthorizedError,
    [HttpStatusCode.Forbidden]: DataQueryErrorTypes.ForbiddenError,
    [HttpStatusCode.InternalServerError]: DataQueryErrorTypes.ServerError,
  });
