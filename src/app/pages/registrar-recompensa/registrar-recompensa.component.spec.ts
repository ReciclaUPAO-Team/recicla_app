import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRecompensaComponent } from './registrar-recompensa.component';

describe('RegistrarRecompensaComponent', () => {
  let component: RegistrarRecompensaComponent;
  let fixture: ComponentFixture<RegistrarRecompensaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarRecompensaComponent]
    });
    fixture = TestBed.createComponent(RegistrarRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
