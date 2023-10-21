import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachPhancongComponent } from './danhsach-phancong.component';

describe('DanhsachPhancongComponent', () => {
  let component: DanhsachPhancongComponent;
  let fixture: ComponentFixture<DanhsachPhancongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhsachPhancongComponent]
    });
    fixture = TestBed.createComponent(DanhsachPhancongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
