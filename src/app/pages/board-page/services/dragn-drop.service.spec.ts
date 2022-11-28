import { TestBed } from '@angular/core/testing';

import { DragnDropService } from './dragn-drop.service';

describe('DragnDropService', () => {
  let service: DragnDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragnDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
