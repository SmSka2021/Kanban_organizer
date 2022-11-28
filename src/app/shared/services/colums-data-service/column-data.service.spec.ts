import { TestBed } from '@angular/core/testing';

import { ColumnDataService } from './column-data.service';

describe('ColumnDataService', () => {
  let service: ColumnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
