import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResiduoComponent } from './ver-residuo.component';

describe('VerResiduoComponent', () => {
  let component: VerResiduoComponent;
  let fixture: ComponentFixture<VerResiduoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerResiduoComponent]
    });
    fixture = TestBed.createComponent(VerResiduoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
