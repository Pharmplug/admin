import { TestBed } from '@angular/core/testing';

import { DevAccessGuard } from './access-control.guard';

describe('DevAccessGuard', () => {
  let guard: DevAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
