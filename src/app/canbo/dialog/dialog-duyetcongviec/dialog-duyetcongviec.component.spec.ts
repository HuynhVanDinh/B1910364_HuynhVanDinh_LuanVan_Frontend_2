import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDuyetcongviecComponent } from './dialog-duyetcongviec.component';

describe('DialogDuyetcongviecComponent', () => {
  let component: DialogDuyetcongviecComponent;
  let fixture: ComponentFixture<DialogDuyetcongviecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDuyetcongviecComponent]
    });
    fixture = TestBed.createComponent(DialogDuyetcongviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
