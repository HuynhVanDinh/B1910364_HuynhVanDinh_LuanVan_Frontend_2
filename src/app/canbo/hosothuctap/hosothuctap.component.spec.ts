import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HosothuctapComponent } from './hosothuctap.component';

describe('HosothuctapComponent', () => {
  let component: HosothuctapComponent;
  let fixture: ComponentFixture<HosothuctapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HosothuctapComponent]
    });
    fixture = TestBed.createComponent(HosothuctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
