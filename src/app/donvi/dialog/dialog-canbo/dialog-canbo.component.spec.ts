import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCanboComponent } from './dialog-canbo.component';

describe('DialogCanboComponent', () => {
  let component: DialogCanboComponent;
  let fixture: ComponentFixture<DialogCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCanboComponent]
    });
    fixture = TestBed.createComponent(DialogCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
