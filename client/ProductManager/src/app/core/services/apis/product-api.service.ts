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
}
