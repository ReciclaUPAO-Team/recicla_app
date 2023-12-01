import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RActividadComponent } from './r-actividad.component';

describe('RActividadComponent', () => {
  let component: RActividadComponent;
  let fixture: ComponentFixture<RActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RActividadComponent]
    });
    fixture = TestBed.createComponent(RActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
