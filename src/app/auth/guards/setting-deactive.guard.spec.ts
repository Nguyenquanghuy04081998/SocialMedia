import { TestBed } from '@angular/core/testing';

import { SettingDeactiveGuard } from './setting-deactive.guard';

describe('SettingDeactiveGuard', () => {
  let guard: SettingDeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SettingDeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
