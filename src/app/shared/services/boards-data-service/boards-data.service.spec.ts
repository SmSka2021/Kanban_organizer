import { TestBed } from '@angular/core/testing';

import { BoardsDataService } from './boards-data.service';

describe('BoardsDataService', () => {
  let service: BoardsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
