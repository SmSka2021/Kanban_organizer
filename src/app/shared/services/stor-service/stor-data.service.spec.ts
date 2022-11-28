import { TestBed } from '@angular/core/testing';

import { StorDataService } from './stor-data.service';

describe('StorDataService', () => {
  let service: StorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
