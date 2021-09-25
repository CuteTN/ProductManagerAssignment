import { TestBed } from '@angular/core/testing';

import { StateConnectorService } from './state-connector.service';

describe('StateProviderService', () => {
  let service: StateConnectorService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
