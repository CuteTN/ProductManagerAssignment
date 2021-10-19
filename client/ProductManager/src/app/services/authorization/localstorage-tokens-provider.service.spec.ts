import { TestBed } from '@angular/core/testing';

import { LocalstorageTokensProviderService } from './localstorage-tokens-provider.service';

describe('LocalstorageTokensProviderService', () => {
  let service: LocalstorageTokensProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageTokensProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
