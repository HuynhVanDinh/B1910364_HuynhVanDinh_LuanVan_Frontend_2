import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnitComponent } from './page-unit.component';

describe('PageUnitComponent', () => {
  let component: PageUnitComponent;
  let fixture: ComponentFixture<PageUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageUnitComponent]
    });
    fixture = TestBed.createComponent(PageUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
