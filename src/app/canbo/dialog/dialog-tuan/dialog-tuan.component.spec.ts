import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTuanComponent } from './dialog-tuan.component';

describe('DialogTuanComponent', () => {
  let component: DialogTuanComponent;
  let fixture: ComponentFixture<DialogTuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTuanComponent]
    });
    fixture = TestBed.createComponent(DialogTuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
