import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuadiemComponent } from './dialog-suadiem.component';

describe('DialogSuadiemComponent', () => {
  let component: DialogSuadiemComponent;
  let fixture: ComponentFixture<DialogSuadiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSuadiemComponent]
    });
    fixture = TestBed.createComponent(DialogSuadiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
