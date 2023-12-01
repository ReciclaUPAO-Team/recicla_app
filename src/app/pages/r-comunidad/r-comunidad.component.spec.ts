import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RComunidadComponent } from './r-comunidad.component';

describe('RComunidadComponent', () => {
  let component: RComunidadComponent;
  let fixture: ComponentFixture<RComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RComunidadComponent]
    });
    fixture = TestBed.createComponent(RComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
