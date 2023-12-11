import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RResiduoComponent } from './r-residuo.component';

describe('RResiduoComponent', () => {
  let component: RResiduoComponent;
  let fixture: ComponentFixture<RResiduoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RResiduoComponent]
    });
    fixture = TestBed.createComponent(RResiduoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
