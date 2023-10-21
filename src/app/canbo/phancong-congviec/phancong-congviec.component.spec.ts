import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhancongCongviecComponent } from './phancong-congviec.component';

describe('PhancongCongviecComponent', () => {
  let component: PhancongCongviecComponent;
  let fixture: ComponentFixture<PhancongCongviecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhancongCongviecComponent]
    });
    fixture = TestBed.createComponent(PhancongCongviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
