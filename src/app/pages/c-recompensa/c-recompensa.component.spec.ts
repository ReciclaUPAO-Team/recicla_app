import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRecompensaComponent } from './c-recompensa.component';

describe('CRecompensaComponent', () => {
  let component: CRecompensaComponent;
  let fixture: ComponentFixture<CRecompensaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CRecompensaComponent]
    });
    fixture = TestBed.createComponent(CRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
