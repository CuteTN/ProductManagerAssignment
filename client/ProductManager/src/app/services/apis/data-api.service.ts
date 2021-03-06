import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataQueryError, DataQueryErrorTypes } from 'src/app/shared/errors';
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

  getAll = () =>
    this.http
      .get(this.url)
      .pipe(catchError(this.handleError));

  getById = (id: number, options?: any) =>
    this.http
      .get(`${this.url}/${id}`, options)
      .pipe(catchError(this.handleError));

  create = (data: any) =>
    this.http
      .post(this.url, data )
      .pipe(catchError(this.handleError));

  update = (id: number, newData: any) =>
    this.http
      .put(`${this.url}/${id}`, newData)
      .pipe(catchError(this.handleError));

  delete = (id: number) =>
    this.http
      .delete(`${this.url}/${id}`)
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
