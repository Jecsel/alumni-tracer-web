import { TestBed } from '@angular/core/testing';

import { PsgcService } from './psgc.service';

describe('PsgcService', () => {
  let service: PsgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
