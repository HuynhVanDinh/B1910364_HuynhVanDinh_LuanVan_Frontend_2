import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachSinhvienComponent } from './danhsach-sinhvien.component';

describe('DanhsachSinhvienComponent', () => {
  let component: DanhsachSinhvienComponent;
  let fixture: ComponentFixture<DanhsachSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhsachSinhvienComponent]
    });
    fixture = TestBed.createComponent(DanhsachSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
