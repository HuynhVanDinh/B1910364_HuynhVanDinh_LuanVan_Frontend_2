import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongviecSinhvienComponent } from './congviec-sinhvien.component';

describe('CongviecSinhvienComponent', () => {
  let component: CongviecSinhvienComponent;
  let fixture: ComponentFixture<CongviecSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongviecSinhvienComponent]
    });
    fixture = TestBed.createComponent(CongviecSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
