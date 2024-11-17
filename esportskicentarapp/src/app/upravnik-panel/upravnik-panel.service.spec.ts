import { TestBed } from '@angular/core/testing';

import { UpravnikPanelService } from './upravnik-panel.service';

describe('UpravnikPanelService', () => {
  let service: UpravnikPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpravnikPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
