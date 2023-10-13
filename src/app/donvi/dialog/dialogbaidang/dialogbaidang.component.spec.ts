import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogbaidangComponent } from './dialogbaidang.component';

describe('DialogbaidangComponent', () => {
  let component: DialogbaidangComponent;
  let fixture: ComponentFixture<DialogbaidangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogbaidangComponent]
    });
    fixture = TestBed.createComponent(DialogbaidangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
