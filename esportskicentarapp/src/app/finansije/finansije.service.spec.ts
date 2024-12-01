import { TestBed } from '@angular/core/testing';

import { FinansijeService } from './finansije.service';

describe('FinansijeService', () => {
  let service: FinansijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinansijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
