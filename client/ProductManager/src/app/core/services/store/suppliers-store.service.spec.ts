import { TestBed } from '@angular/core/testing';

import { SuppliersStoreService } from './suppliers-store.service';

describe('SuppliersStoreService', () => {
  let service: SuppliersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
