import { TestBed } from '@angular/core/testing';

import { UserHasRoleGuard } from './user-has-role.guard';

describe('UserHasRoleGuard', () => {
  let guard: UserHasRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserHasRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
