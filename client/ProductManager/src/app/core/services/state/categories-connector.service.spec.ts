import { TestBed } from '@angular/core/testing';

import { CategoriesConnectorService } from './categories-connector.service';

describe('CategoriesConnectorService', () => {
  let service: CategoriesConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
