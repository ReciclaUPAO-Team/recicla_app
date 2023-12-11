import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadisticaComponent } from './ver-estadistica.component';

describe('VerEstadisticaComponent', () => {
  let component: VerEstadisticaComponent;
  let fixture: ComponentFixture<VerEstadisticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerEstadisticaComponent]
    });
    fixture = TestBed.createComponent(VerEstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
