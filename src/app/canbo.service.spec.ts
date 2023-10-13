import { TestBed } from '@angular/core/testing';

import { CanboService } from './canbo.service';

describe('CanboService', () => {
  let service: CanboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
