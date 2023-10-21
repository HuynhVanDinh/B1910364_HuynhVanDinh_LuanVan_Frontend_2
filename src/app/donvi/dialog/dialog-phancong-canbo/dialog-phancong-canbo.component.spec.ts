import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPhancongCanboComponent } from './dialog-phancong-canbo.component';

describe('DialogPhancongCanboComponent', () => {
  let component: DialogPhancongCanboComponent;
  let fixture: ComponentFixture<DialogPhancongCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPhancongCanboComponent]
    });
    fixture = TestBed.createComponent(DialogPhancongCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
