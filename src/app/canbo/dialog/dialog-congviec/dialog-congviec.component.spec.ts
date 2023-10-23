import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCongviecComponent } from './dialog-congviec.component';

describe('DialogCongviecComponent', () => {
  let component: DialogCongviecComponent;
  let fixture: ComponentFixture<DialogCongviecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCongviecComponent]
    });
    fixture = TestBed.createComponent(DialogCongviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
