import { TestBed } from '@angular/core/testing';

import { RequestClientBuilderService } from './request-client-builder.service';

describe('RequestClientBuilderService', () => {
  let service: RequestClientBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestClientBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
