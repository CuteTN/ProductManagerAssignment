import { Inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  fetchAll(onSuccess?: SuccessHandler, onError?: ErrorHandler) {
    const sub = this.apiService?.getAll().subscribe(
      (response) => {
        const action = this.createSetAllAction?.(response as TItem[]);
        if (action) this.store.dispatch(action);
        this._isLoaded = true;

        onSuccess?.(response);
        sub?.unsubscribe();
      },
      (error) => {
        if (onError) onError(error);
        else throw error;
      }
    );
  }

  getAll(onSuccess?: SuccessHandler, onError?: ErrorHandler) {
    if (!this._isLoaded) this.fetchAll(onSuccess, onError);
    return this._value;
  }

  reset(...opt: any) {
    this._isLoaded = false;

    const action = this.createResetAction?.(opt);
    if (action) this.store.dispatch(action);
  }

  add(
    item: TItem,
    onSuccess?: SuccessHandler,
    onError?: ErrorHandler,
    ...opt: any
  ) {
    const sub = this.apiService?.create(item).subscribe(
      (response) => {
        const action = this.createAddAction?.(response as TItem, opt);
        if (action) this.store.dispatch(action);

        onSuccess?.(response);
        sub?.unsubscribe();
      },
      (error) => {
        if (onError) onError(error);
        else throw error;
      }
    );

    return sub;
  }

  update(
    id: number,
    item: TItem,
    onSuccess?: SuccessHandler,
    onError?: ErrorHandler,
    ...opt: any
  ) {
    const sub = this.apiService?.update(id, item).subscribe(
      (response) => {
        const action = this.createUpdateAction?.(response as TItem, opt);
        if (action) this.store.dispatch(action);

        onSuccess?.(response);
        sub?.unsubscribe();
      },
      (error) => {
        if (onError) onError(error);
        else throw error;
      }
    );

    return sub;
  }

  delete(
    id: number,
    onSuccess?: SuccessHandler,
    onError?: ErrorHandler,
    ...opt: any
  ) {
    const sub = this.apiService?.delete(id).subscribe(
      (response) => {
        const action = this.createDeleteAction?.(id, opt);
        if (action) this.store.dispatch(action);

        onSuccess?.(response);
        sub?.unsubscribe();
      },
      (error) => {
        if (onError) onError(error);
        else throw error;
      }
    );

    return sub;
  }
}

type SuccessHandler = (response: any) => void;
type ErrorHandler = (error: any) => void;
