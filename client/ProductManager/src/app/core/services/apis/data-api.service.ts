import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataQueryError, DataQueryErrorTypes } from '../../errors';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll = () => this.http.get(this.url).pipe(catchError(this.handleError));

  getById = (id: number) => this.http.get(`${this.url}/${id}`).pipe(catchError(this.handleError));

  create = (data: any) => this.http.post(this.url, data).pipe(catchError(this.handleError));

  update = (id: number, newData: any) => this.http.put(`${this.url}/${id}`, newData).pipe(catchError(this.handleError));

  delete = (id: number) => this.http.delete(`${this.url}/${id}`).pipe(catchError(this.handleError));

  private handleError = (error: Response) => {
    const appErrorType = ERROR_MAPPER[error.status];
    return throwError(new DataQueryError(error, appErrorType));
  };
}

const ERROR_MAPPER: { [status: number]: DataQueryErrorTypes | undefined } =
  Object.freeze({
    [HttpStatusCode.NotFound]: DataQueryErrorTypes.NotFound,
    [HttpStatusCode.BadRequest]: DataQueryErrorTypes.BadRequest,
    [HttpStatusCode.InternalServerError]: DataQueryErrorTypes.ServerError,
  });
