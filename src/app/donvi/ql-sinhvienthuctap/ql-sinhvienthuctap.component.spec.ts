import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlSinhvienthuctapComponent } from './ql-sinhvienthuctap.component';

describe('QlSinhvienthuctapComponent', () => {
  let component: QlSinhvienthuctapComponent;
  let fixture: ComponentFixture<QlSinhvienthuctapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlSinhvienthuctapComponent]
    });
    fixture = TestBed.createComponent(QlSinhvienthuctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
