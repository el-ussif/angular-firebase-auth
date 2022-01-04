import { TestBed } from '@angular/core/testing';

import { IsLoggedGuard } from 'src/app/utils/intercepters/is-logged.guard';

describe('AcountGuard', () => {
  let guard: IsLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
