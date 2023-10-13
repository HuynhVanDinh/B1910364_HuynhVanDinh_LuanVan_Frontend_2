import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhancongCanboComponent } from './phancong-canbo.component';

describe('PhancongCanboComponent', () => {
  let component: PhancongCanboComponent;
  let fixture: ComponentFixture<PhancongCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhancongCanboComponent]
    });
    fixture = TestBed.createComponent(PhancongCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
