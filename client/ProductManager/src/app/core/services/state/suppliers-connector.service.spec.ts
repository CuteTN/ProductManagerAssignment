import { TestBed } from '@angular/core/testing';

import { SuppliersConnectorService } from './suppliers-connector.service';

describe('SuppliersConnectorService', () => {
  let service: SuppliersConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
