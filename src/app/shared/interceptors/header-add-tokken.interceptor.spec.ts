import { TestBed } from '@angular/core/testing';

import { HeaderAddTokkenInterceptor } from './header-add-tokken.interceptor';

describe('HeaderAddTokkenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HeaderAddTokkenInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: HeaderAddTokkenInterceptor = TestBed.inject(
      HeaderAddTokkenInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
