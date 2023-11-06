import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamdiemSinhvienComponent } from './chamdiem-sinhvien.component';

describe('ChamdiemSinhvienComponent', () => {
  let component: ChamdiemSinhvienComponent;
  let fixture: ComponentFixture<ChamdiemSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChamdiemSinhvienComponent]
    });
    fixture = TestBed.createComponent(ChamdiemSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
