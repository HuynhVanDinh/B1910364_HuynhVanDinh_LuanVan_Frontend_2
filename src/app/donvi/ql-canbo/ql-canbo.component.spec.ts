import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlCanboComponent } from './ql-canbo.component';

describe('QlCanboComponent', () => {
  let component: QlCanboComponent;
  let fixture: ComponentFixture<QlCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlCanboComponent]
    });
    fixture = TestBed.createComponent(QlCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
