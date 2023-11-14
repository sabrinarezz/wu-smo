import { TestBed } from '@angular/core/testing';

import { ReceiversService } from './receivers.service';

describe('ReceiversService', () => {
  let service: ReceiversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
