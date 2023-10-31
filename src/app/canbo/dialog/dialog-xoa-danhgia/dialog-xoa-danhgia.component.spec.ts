import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogXoaDanhgiaComponent } from './dialog-xoa-danhgia.component';

describe('DialogXoaDanhgiaComponent', () => {
  let component: DialogXoaDanhgiaComponent;
  let fixture: ComponentFixture<DialogXoaDanhgiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogXoaDanhgiaComponent]
    });
    fixture = TestBed.createComponent(DialogXoaDanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
