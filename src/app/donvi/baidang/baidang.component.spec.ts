import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaidangComponent } from './baidang.component';

describe('BaidangComponent', () => {
  let component: BaidangComponent;
  let fixture: ComponentFixture<BaidangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaidangComponent]
    });
    fixture = TestBed.createComponent(BaidangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
