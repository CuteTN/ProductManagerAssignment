import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_SERVER_URL } from '../../../app.env';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends DataApiService {
  constructor(http: HttpClient) {
    super(`${LOCAL_SERVER_URL}/api/products`, http);
  }

  getSome = (filterParams: ProductFilterParams) => {
    const url = this.url + '?' + convertToQueryString(filterParams);
    return this.http.get(url);
  };

  getCount = (filterParams?: ProductFilterParams) => {
    let url = this.url + '/count';
    if (filterParams) url += '?' + convertToQueryString(filterParams);

    return this.http.get(url);
  };
}

function convertToQueryString(filterParams: ProductFilterParams): string {
  const cloneParams = { ...filterParams };
  let query = '';

  if (cloneParams.categoryIds) {
    cloneParams.categoryIds.forEach((categoryId) => {
      query += `categoryId=${categoryId}&`;
    });
  }
  delete cloneParams.categoryIds;

  if (cloneParams.sortRules) {
    cloneParams.sortRules.forEach((sortRule) => {
      query += `sortBy=${sortRule.field}:${sortRule.direction}&`;
    });
  }
  delete cloneParams.sortRules;

  Object.entries(cloneParams).forEach(([key, value]) => {
    if (value != undefined) {
      // NOTE: Got to use magic strings here because testing instanceof Date does not work.
      if (key === 'minReleaseDate' || key === 'maxReleaseDate') {
        const str = (value as Date).toISOString();
        query += `${key}=${str}&`;
      } else query += `${key}=${value}&`;
    }
  });

  return query;
}

export interface ProductFilterParams {
  minId?: number;
  maxId?: number;
  hasName?: string;
  minReleaseDate?: Date;
  maxReleaseDate?: Date;
  minRating?: number;
  maxRating?: number;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: number;
  categoryIds?: number[];

  page?: number;
  limit?: number;

  sortRules?: ProductSortRule[];
}

export interface ProductSortRule {
  field: string;
  direction: 'asc' | 'desc';
}
