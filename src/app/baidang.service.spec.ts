import { TestBed } from '@angular/core/testing';

import { BaidangService } from './baidang.service';

describe('BaidangService', () => {
  let service: BaidangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaidangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
