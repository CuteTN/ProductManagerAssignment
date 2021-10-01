import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_SERVER_URL } from '../../../app.env';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends DataApiService {
  constructor(http: HttpClient) { 
    super(`${LOCAL_SERVER_URL}/api/products`, http);
  }

  getSome = (filterParams: ProductFilterParams) => {
    const cloneParams = {...filterParams}
    let url = this.url + '?';

    if(cloneParams.categoryIds) {
      cloneParams.categoryIds.forEach(categoryId => {
        url += `categoryId=${categoryId}&`;
      })
    }
    delete cloneParams.categoryIds;
    
    if(cloneParams.sortRules) {
      cloneParams.sortRules.forEach(sortRule => {
        url += `sortBy=${sortRule.field}:${sortRule.direction}&`;
      })
    }
    delete cloneParams.sortRules;

    Object.entries(cloneParams).forEach(([key, value]) => {
      url += `${key}=${value}&`;
    })

    return this.http.get(url);
  }

  getCount = () => {
    return this.http.get(`${this.url}/count`);
  }
}

export interface ProductFilterParams {
  minId?: number,
  maxId?: number,
  hasName?: string;
  minReleaseDate?: Date,
  maxReleaseDate?: Date,
  minRating?: number,
  maxRating?: number,
  minPrice?: number,
  maxPrice?: number,
  supplierId?: number,
  categoryIds?: number[],

  page?: number,
  limit?: number,

  sortRules?: ProductSortRule[],
}

export interface ProductSortRule {
  field: string,
  direction: "asc" | "desc",
}