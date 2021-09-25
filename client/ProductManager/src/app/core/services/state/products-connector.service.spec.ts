import { TestBed } from '@angular/core/testing';

import { ProductsConnectorService } from './products-connector.service';

describe('ProductsConnectorService', () => {
  let service: ProductsConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
