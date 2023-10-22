import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomSinhvienComponent } from './nhom-sinhvien.component';

describe('NhomSinhvienComponent', () => {
  let component: NhomSinhvienComponent;
  let fixture: ComponentFixture<NhomSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomSinhvienComponent]
    });
    fixture = TestBed.createComponent(NhomSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
