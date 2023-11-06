import { TestBed } from '@angular/core/testing';

import { DiemcanboService } from './diemcanbo.service';

describe('DiemcanboService', () => {
  let service: DiemcanboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiemcanboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
