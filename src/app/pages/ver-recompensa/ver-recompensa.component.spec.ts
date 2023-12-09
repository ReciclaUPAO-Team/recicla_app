import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRecompensaComponent } from './ver-recompensa.component';

describe('VerRecompensaComponent', () => {
  let component: VerRecompensaComponent;
  let fixture: ComponentFixture<VerRecompensaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerRecompensaComponent]
    });
    fixture = TestBed.createComponent(VerRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
