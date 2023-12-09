import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebarAdministradorComponent } from './slidebar-administrador.component';

describe('SlidebarAdministradorComponent', () => {
  let component: SlidebarAdministradorComponent;
  let fixture: ComponentFixture<SlidebarAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidebarAdministradorComponent]
    });
    fixture = TestBed.createComponent(SlidebarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
