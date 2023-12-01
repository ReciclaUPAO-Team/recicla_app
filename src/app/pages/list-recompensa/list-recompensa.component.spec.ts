import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecompensaComponent } from './list-recompensa.component';

describe('ListRecompensaComponent', () => {
  let component: ListRecompensaComponent;
  let fixture: ComponentFixture<ListRecompensaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecompensaComponent]
    });
    fixture = TestBed.createComponent(ListRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
