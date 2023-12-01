import { TestBed } from '@angular/core/testing';

import { ReActividadService } from './re-actividad.service';

describe('ReActividadService', () => {
  let service: ReActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
