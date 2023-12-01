import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHistorialComponent } from './v-historial.component';

describe('VHistorialComponent', () => {
  let component: VHistorialComponent;
  let fixture: ComponentFixture<VHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VHistorialComponent]
    });
    fixture = TestBed.createComponent(VHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
