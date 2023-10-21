import { TestBed } from '@angular/core/testing';

import { SinhvienThuctapService } from './sinhvien-thuctap.service';

describe('SinhvienThuctapService', () => {
  let service: SinhvienThuctapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinhvienThuctapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
