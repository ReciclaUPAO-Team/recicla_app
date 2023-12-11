import { TestBed } from '@angular/core/testing';

import { ResiduoService } from './residuo.service';

describe('ResiduoService', () => {
  let service: ResiduoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResiduoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
