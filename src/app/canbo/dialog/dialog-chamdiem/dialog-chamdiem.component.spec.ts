import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChamdiemComponent } from './dialog-chamdiem.component';

describe('DialogChamdiemComponent', () => {
  let component: DialogChamdiemComponent;
  let fixture: ComponentFixture<DialogChamdiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChamdiemComponent]
    });
    fixture = TestBed.createComponent(DialogChamdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
