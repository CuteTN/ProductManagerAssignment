import { Inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class StateStoreService<TItem> {
  apiService?: DataApiService;

  private _isLoaded: boolean = false;
  get isLoaded() {
    return this._isLoaded;
  }

  private _value: Observable<TItem[]>;

  constructor(
    public store: Store<AppState>,
    @Inject('selector') selector: (state: AppState) => any
  ) {
    this._value = store.select(selector);
  }

  // factory methods
  protected createSetAllAction?: (items: TItem[], ...opt: any) => Action;
  protected createResetAction?: (...opt: any) => Action;
  protected createAddAction?: (item: TItem, ...opt: any) => Action;
  protected createUpdateAction?: (item: TItem, ...opt: any) => Action;
  protected createDeleteAction?: (id: number, ...opt: any) => Action;

  fetchAll() {
    return this.apiService?.getAll().pipe(
      map(
        (response) => {
          const action = this.createSetAllAction?.(response as TItem[]);
          if (action) this.store.dispatch(action);
          this._isLoaded = true;
          return response;
        }
      ),
      catchError((error) => {
        throw error;
      })
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
    item: TItem,
    ...opt: any
  ) {
    return this.apiService?.create(item).pipe(
      map(
        (response) => {
          const action = this.createAddAction?.(response as TItem, opt);
          if (action) this.store.dispatch(action);
          return response; 
        }
      ),
      catchError((error) => {
        throw error;
      })
    );
  }

  update(id: number, item: TItem, ...opt: any) {
    return this.apiService?.update(id, item).pipe(
      map((response) => {
        const action = this.createUpdateAction?.(response as TItem, opt);
        if (action) this.store.dispatch(action);
        return response;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  delete(id: number, ...opt: any) {
    return this.apiService?.delete(id).pipe(
      map((response) => {
        const action = this.createDeleteAction?.(id, opt);
        if (action) this.store.dispatch(action);
        return response;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}

type SuccessHandler = (response: any) => void;
type ErrorHandler = (error: any) => void;
