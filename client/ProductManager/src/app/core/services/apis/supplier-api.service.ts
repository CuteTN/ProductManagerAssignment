import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageTokensProviderService } from '..';
import { LOCAL_SERVER_URL } from '../../../app.env';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierApiService extends DataApiService {
  constructor(
    http: HttpClient,
    tokenProvider: LocalstorageTokensProviderService
  ) {
    super(`${LOCAL_SERVER_URL}/api/suppliers`, http, tokenProvider);
  }
}
