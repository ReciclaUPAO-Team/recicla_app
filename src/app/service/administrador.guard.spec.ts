import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdministradorGuard } from './administrador.guard';

describe('AuthGuard', () => {
  let guard: AdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministradorGuard]
    });
    guard = TestBed.inject(AdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});

