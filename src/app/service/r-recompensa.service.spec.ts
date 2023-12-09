import { TestBed } from '@angular/core/testing';

import { RRecompensaService } from './r-recompensa.service';

describe('RRecompensaService', () => {
  let service: RRecompensaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RRecompensaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
