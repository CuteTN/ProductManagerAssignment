import { Inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { DataApiService } from '../apis/data-api.service';

/**
 * connect data API service with ngrx
 * Provide an optimization and simplification for accessing data
 */
 @Injectable({
   providedIn: 'root',
 })
export class StateStoreService {
  apiService?: DataApiService;

  private _isLoaded: boolean = false;
  get isLoaded() {
    return this._isLoaded;
  }

  private _value: Observable<any[]>;

  constructor(
    @Inject(Store) public store: Store<AppState>,
    @Inject(Function) selector: (state: AppState) => any
  ) {
    this._value = store.select(selector);
  }

  // factory methods
  protected createSetAllAction?: (items: any[], ...opt: any) => Action;
  protected createResetAction?: (...opt: any) => Action;
  protected createAddAction?: (item: any, ...opt: any) => Action;
  protected createUpdateAction?: (item: any, ...opt: any) => Action;
  protected createDeleteAction?: (id: number, ...opt: any) => Action;

  fetchAll() {
    return this.apiService?.getAll().pipe(
      map(
        (response) => {
          const action = this.createSetAllAction?.(response as any[]);
          if (action) this.store.dispatch(action);
          this._isLoaded = true;
          return response;
        }
      ),
    );
  }

  getAll(onSuccess?: SuccessHandler, onError?: ErrorHandler) {
    if (!this._isLoaded) 
      this.fetchAll()?.subscribe(
        (response) => onSuccess?.(response),
        (error) => onError?.(error) 
      );

    return this._value;
  }

  reset(...opt: any) {
    this._isLoaded = false;

    const action = this.createResetAction?.(opt);
    if (action) this.store.dispatch(action);
  }

  add(
    item: any,
    ...opt: any
  ) {
    return this.apiService?.create(item).pipe(
      map(
        (response) => {
          const action = this.createAddAction?.(response as any, opt);
          if (action) this.store.dispatch(action);
          return response; 
        }
      )
    );
  }

  update(id: number, item: any, ...opt: any) {
    return this.apiService?.update(id, item).pipe(
      map((response) => {
        const action = this.createUpdateAction?.(response as any, opt);
        if (action) this.store.dispatch(action);
        return response;
      }),
      catchError(error => throwError(error))
    );
  }

  delete(id: number, ...opt: any) {
    return this.apiService?.delete(id).pipe(
      map((response) => {
        const action = this.createDeleteAction?.(id, opt);
        if (action) this.store.dispatch(action);
        return response;
      })
    );
  }
}

type SuccessHandler = (response: any) => void;
type ErrorHandler = (error: any) => void;
